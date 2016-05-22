import Rocket from "../img/falcon.svg";
import Engine from "./ship_modules/Engine";
import Core from "./ship_modules/Core";
import Armor from "./ship_modules/Armor";
import Wing from "./ship_modules/Wing";
import Gun from "./ship_modules/gun/Gun";

import {boundingBox} from "./Utils"

const SHIP_SCHEMATIC = [
  "SGS",
  "WXW",
  " E "
];

import {DEGREE, BLOCK_SIZE} from "./Constants"

export default class DummyShip {

  constructor(game) {
    this.game = game;
    this.x = 200;
    this.y = 200;
    this.pivotX = 21;
    this.pivotY = 23;

    this.width = 30;
    this.height = 30;


    this.mass = 0;

    this.dx = 0;
    this.dy = 0;
    this.enginePower = 0;

    this.angle = 60;
    this.turnPower = 0;

    this.cost = 0;

    this.turningCCW = true;
    this.turningCW = false;
    this.accelerating = true;

    this.img = new Image();
    this.img.src = Rocket;

    this.loadParts();
  }

  get globalAngle() {
    return this.angle;
  }

  loadParts(){
    this._modules = [];

    for (var row = 0; row < SHIP_SCHEMATIC.length; row++) {
      var y = row*BLOCK_SIZE;

      var partsRow = [];
      this._modules.push(partsRow);
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
          gun.shooting = true;
          partsRow.push(gun);
        }else if(block === "W"){
          partsRow.push(new Wing(this, true,x,y));
        }else if(block === "X"){
          this.pivotX = pos*BLOCK_SIZE + BLOCK_SIZE/2;
          this.pivotY = row*BLOCK_SIZE + BLOCK_SIZE/2;
          partsRow.push(new Core(this,x,y));
        }else{
          partsRow.push(undefined);
        }
      }
    }

    this.recalculateAggregateProperties();
  }

  recalculateAggregateProperties(){
    var allParts = [].concat.apply([], this._modules).filter((p)=> p != undefined);

    this.mass = allParts.map((p)=>p.mass).reduce((a,b)=>a+b,0);
    this.enginePower = allParts.map((p)=>p.enginePower).reduce((a,b)=>a+b,0);
    this.turnPower = allParts.map((p)=>p.turnPower).reduce((a,b)=>a+b,0);
    this.cost  = allParts.map((p)=>p.cost).reduce((a,b)=>a+b,0);

    this.modulesThatTick = allParts.filter((p)=>p.tick != undefined )
  }

  draw(screen){
    screen.save();
    screen.translate(this.x,this.y);
    screen.rotate(90*DEGREE);
    screen.rotate(this.angle);

    screen.translate(-this.pivotX,-this.pivotY);

    for (var row = 0; row < this._modules.length; row++) {
      var positions = this._modules[row];
      for (var pos = 0; pos < positions.length; pos++) {
        var block = positions[pos];
        if(block != undefined){
          block.draw(screen);
        }
      }
    }
    screen.restore();

    // this.drawBoundingBox(screen);

  }

  collide(collidedWith){
    // console.log(this.constructor.name + " collided with " + collidedWith.constructor.name);
  }

  drawBoundingBox(screen){
    const bbox = boundingBox(this);
    screen.beginPath();
    bbox.points.forEach((p)=>{
      screen.lineTo(p.x,p.y)
    });
    screen.closePath();
    screen.strokeStyle = "orange";
    screen.stroke();
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

  removeModule(moduleToRemove){
    for (var y = 0; y < this._modules.length; y++) {
      var row = this._modules[y];
      for (var x = 0; x < row.length; x++) {
        var module = row[x];

        if(module === moduleToRemove){
          this._modules[y][x] = undefined;
          this.recalculateAggregateProperties();
        }
      }
    }
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

  get globalX(){
    return this.x;
  }

  get globalY(){
    return this.y
  }

  get modules(){
    return [].concat.apply([], this._modules).filter((p)=> p != undefined);
  }
}
