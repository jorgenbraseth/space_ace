import Rocket from "../img/falcon.svg";
import Engine from "./ship_modules/Engine";
import Core from "./ship_modules/Core";
import Armor from "./ship_modules/Armor";
import Wing from "./ship_modules/Wing";
import Gun from "./ship_modules/gun/Gun";

import {KEY_MAP} from "./Keys"

const DEGREE = (Math.PI/180);



const SHIP_SCHEMATIC = [
  "            ",
  "     X      ",
  "            "
];

const BLOCK_SIZE = 10;

export default class Ship {

  constructor(game) {
    this.game = game;
    this.x = 55;
    this.y = 55;
    this.centerX = 21;
    this.centerY = 23;

    this.mass = 0;

    this.dx = 0;
    this.dy = 0;
    this.enginePower = 0;

    this.angle = 0;
    this.turnPower = 0;

    this.cost = 0;

    this.turningCCW = false;
    this.turningCW = false;

    this.bindKeys();

    this.img = new Image();
    this.img.src = Rocket;

    this.loadParts();
  }

  loadParts(){
    this.parts = [];

    for (var row = 0; row < SHIP_SCHEMATIC.length; row++) {
      var y = row*BLOCK_SIZE;

      var partsRow = [];
      this.parts.push(partsRow);
      var positions = SHIP_SCHEMATIC[row].split("");
      for (var pos = 0; pos < positions.length; pos++) {
        var x = pos*BLOCK_SIZE;

        var block = positions[pos];
        if(block === "E"){
          var engine = new Engine(this,x,y);
          partsRow.push(engine)
        }else if(block === "S"){
          partsRow.push(new Armor(this,x,y));
        }else if(block === "G"){
          var gun = new Gun(this,x,y);
          partsRow.push(gun);
        }else if(block === "W"){
          partsRow.push(new Wing(this, true,x,y));
        }else if(block === "X"){
          this.centerX = pos*BLOCK_SIZE + BLOCK_SIZE/2;
          this.centerY = row*BLOCK_SIZE + BLOCK_SIZE/2;
          partsRow.push(new Core(this,x,y));
        }else{
          partsRow.push(undefined);
        }
      }
    }

    this.recalculateAggregateProperties();
  }

  recalculateAggregateProperties(){
    var allParts = [].concat.apply([], this.parts).filter((p)=> p != undefined);

    this.mass = allParts.map((p)=>p.mass).reduce((a,b)=>a+b,0);
    this.enginePower = allParts.map((p)=>p.enginePower).reduce((a,b)=>a+b,0);
    this.turnPower = allParts.map((p)=>p.turnPower).reduce((a,b)=>a+b,0);
    this.cost  = allParts.map((p)=>p.cost).reduce((a,b)=>a+b,0);

    this.modulesThatTick = allParts.filter((p)=>p.tick != undefined )
  }

  bindKeys() {
    this.game.keyControl.onKeyDown(KEY_MAP.ACCELERATE, ()=> this.accelerating = true);
    this.game.keyControl.onKeyDown(KEY_MAP.TURN_CLOCKWISE, ()=> this.turningCW = true);
    this.game.keyControl.onKeyDown(KEY_MAP.TURN_COUNTERCLOCKWISE, ()=> this.turningCCW = true);

    this.game.keyControl.onKeyUp(KEY_MAP.ACCELERATE, ()=> this.accelerating = false);
    this.game.keyControl.onKeyUp(KEY_MAP.TURN_CLOCKWISE, ()=> this.turningCW = false);
    this.game.keyControl.onKeyUp(KEY_MAP.TURN_COUNTERCLOCKWISE, ()=> this.turningCCW = false);
  }


  draw(screen){
    screen.save();
    screen.translate(this.x,this.y);
    screen.rotate(90*DEGREE);
    screen.rotate(this.angle);

    screen.translate(-this.centerX,-this.centerY);

    for (var row = 0; row < this.parts.length; row++) {
      var positions = this.parts[row];
      for (var pos = 0; pos < positions.length; pos++) {
        var block = positions[pos];
        if(block != undefined){
          block.draw(screen);
        }
      }
    }
    screen.restore();
  }

  get movementAngleRadians(){
    var radians = Math.atan2(this.dy,this.dx);
    return radians;
  }

  get drag(){
    return this.physicsDrag;
  }

  get physicsDrag() {
    const fluidDensity = 0.5;
    const frontalArea = this.mass;
    const speed = Math.sqrt(Math.pow(this.dx,2)+Math.pow(this.dy,2));
    const dragForce = 0.05*fluidDensity*frontalArea*Math.pow(speed,2);

    return dragForce/this.mass;
  }

  get acceleration() {
    return (this.enginePower / this.mass);
  }

  get turnSpeed() {
    return this.turnPower / this.mass * DEGREE;
  }

  tickModules(){
    this.modulesThatTick.forEach((m)=>m.tick());
  }

  tick() {
    this.tickModules();

    this.calculateNewAngle();
    this.calculateNewSpeeds();
    this.moveAccordingToSpeed();

    this.wrapAroundWorld();

  }

  moveAccordingToSpeed(){
    this.x += this.dx;
    this.y += this.dy;
  }

  wrapAroundWorld(){
    var cw = this.game.canvas.getAttribute("width");
    var ch = this.game.canvas.getAttribute("height");
    if(this.x < 0){
      this.x = cw - this.x;
    }else if(this.x > cw){
      this.x = this.x - cw;
    }
    if(this.y < 0){
      this.y = ch - this.y;
    }else if(this.y > ch){
      this.y = this.y - ch;
    }
  }

  calculateNewAngle(){
    if(this.turningCCW){
      this.angle -= this.turnSpeed ;
    }
    if(this.turningCW){
      this.angle += this.turnSpeed ;
    }
  }

  calculateNewSpeeds(){
    if(this.accelerating ){
      var accX = Math.cos(this.angle)*this.acceleration;
      this.dx = this.dx + accX;

      var accY = Math.sin(this.angle)*this.acceleration;
      this.dy = this.dy + accY;
    }

    var breakX = Math.cos(this.movementAngleRadians)*this.drag;
    this.dx = this.dx - breakX;

    var breakY = Math.sin(this.movementAngleRadians)*this.drag;
    this.dy = this.dy - breakY;

    if(this.speed < 0.15){
      this.dx = 0;
      this.dy = 0;
    }
  }

  get speed() {
    return Math.sqrt(Math.pow(this.dx,2)+Math.pow(this.dy,2));
  }
}
