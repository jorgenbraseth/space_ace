import Sprite from "./Sprite";

import Engine from "./ship_modules/Engine";
import Core from "./ship_modules/Core";
import Armor from "./ship_modules/Armor";
import Wing from "./ship_modules/Wing";
import Gun from "./ship_modules/gun/Gun";

import {DEGREE, BLOCK_SIZE} from "./Constants"

// var _x,_y,_dx,_dy,_width,_height, _angle,_pivotX,_pivotY;
// var _enginePower, _turnPower, _mass, _cost;
//
// var _turningCW, _turningCCW, _accelerating;
// var _modules;
//

export default class Ship extends Sprite {

  constructor(game, x, y, angle, schematic) {
    super();
    this.schematic = schematic;
    this.game = game;
    this._x = x;
    this._y = y;
    this._dx = 0;
    this._dy = 0;

    this._accelerating = false;

    this._angle = angle;

    this._turningCCW = false;
    this._turningCW = false;

    this.loadParts();
  }

  get globalAngle() {
    return this._angle;
  }

  get width() {
    return this._width;
  }

  get height(){
    return this._height;
  }

  get globalX(){
    return this._x;
  }

  get globalY(){
    return this._y
  }

  get drawParent(){
    return undefined
  }

  get pivotX() {
    return this._pivotX;
  }

  get pivotY(){
    return this._pivotY;
  }

  get x(){
    return this._x;
  }
  get y(){
    return this._y;
  }

  get accelerating(){
    return this._accelerating;
  }

  set accelerating(isAccelerating){
    this._accelerating = isAccelerating
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

  loadParts(){
    this._modules = [];

    for (var row = 0; row < this.schematic.length; row++) {
      var y = row*BLOCK_SIZE;

      var partsRow = [];
      this._modules.push(partsRow);
      var positions = this.schematic[row].split("");
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
          this._pivotX = pos*BLOCK_SIZE + BLOCK_SIZE/2;
          this._pivotY = row*BLOCK_SIZE + BLOCK_SIZE/2;
          partsRow.push(new Core(this,x,y));
        }else{
          partsRow.push(undefined);
        }
      }
    }

    this.recalculateAggregateProperties();
    this.calculateWidthAndHeight();
  }


  get enginePower(){
    return this._enginePower;
  }
  get mass(){
    return this._mass;
  }
  get turnPower(){
    return this._turnPower;
  }
  get cost(){
    return this._cost;
  }

  recalculateAggregateProperties() {
    var allParts = this.modules;

    this._mass = allParts.map((p)=>p.mass).reduce((a, b)=>a + b, 0);
    this._enginePower = allParts.map((p)=>p.enginePower).reduce((a, b)=>a + b, 0);
    this._turnPower = allParts.map((p)=>p.turnPower).reduce((a, b)=>a + b, 0);
    this._cost = allParts.map((p)=>p.cost).reduce((a, b)=>a + b, 0);

    this.modulesThatTick = allParts.filter((p)=>p.tick != undefined)
  }


  calculateWidthAndHeight(){
    var lowestX=1000;
    var lowestY=1000;
    var highestX=-1;
    var highestY=-1;
    for (var y = 0; y < this._modules.length; y++) {
      var row = this._modules[y];
      for (var x = 0; x < row.length; x++) {
        var module = row[x];
        if(module !== undefined){
          if(x<lowestX){
            lowestX = x;
          }
          if(x>highestX){
            highestX = x;
          }
          if(y<lowestY){
            lowestY = y;
          }
          if(y>highestY){
            highestY = y;
          }
        }
      }
    }

    this._width = (highestX-lowestX+1)*BLOCK_SIZE;
    this._height = (highestY-lowestY+1)*BLOCK_SIZE;
  }

  draw(screen){
    screen.save();
    screen.translate(this._x,this._y);
    screen.rotate(90*DEGREE);
    screen.rotate(this._angle);

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

  get modules(){
    return [].concat.apply([], this._modules).filter((p)=> p != undefined);
  }

  collide(collidedWith){
    throw "Unimplemented collide in class "+this.constructor.name;
  }

  get movementAngleRadians(){
    var radians = Math.atan2(this._dy,this._dx);
    return radians;
  }

  get drag(){
    return this.physicsDrag;
  }

  get physicsDrag() {
    const fluidDensity = 0.5;
    const frontalArea = this.mass;
    const speed = Math.sqrt(Math.pow(this._dx,2)+Math.pow(this._dy,2));
    const dragForce = 0.05*fluidDensity*frontalArea*Math.pow(speed,2);

    return dragForce/this.mass;
  }

  get acceleration() {
    return (this.enginePower / this.mass);
  }

  get turnSpeed() {
    return this.turnPower / this.mass * DEGREE;
  }
  get angle() {
    return this._angle;
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
    this._x += this._dx;
    this._y += this._dy;
  }

  wrapAroundWorld(){
    var cw = this.game.canvas.getAttribute("width");
    var ch = this.game.canvas.getAttribute("height");
    if(this._x < 0){
      this._x = cw - this._x;
    }else if(this._x > cw){
      this._x = this._x - cw;
    }
    if(this._y < 0){
      this._y = ch - this._y;
    }else if(this._y > ch){
      this._y = this._y - ch;
    }
  }

  calculateNewAngle(){
    if(this._turningCCW){
      this._angle -= this.turnSpeed ;
    }
    if(this._turningCW){
      this._angle += this.turnSpeed ;
    }
  }

  calculateNewSpeeds(){
    if(this.accelerating ){
      var accX = Math.cos(this._angle)*this.acceleration;
      this._dx = this._dx + accX;

      var accY = Math.sin(this._angle)*this.acceleration;
      this._dy = this._dy + accY;
    }

    var breakX = Math.cos(this.movementAngleRadians)*this.drag;
    this._dx = this._dx - breakX;

    var breakY = Math.sin(this.movementAngleRadians)*this.drag;
    this._dy = this._dy - breakY;

    if(this.speed < 0.15){
      this._dx = 0;
      this._dy = 0;
    }
  }

  get speed() {
    return Math.sqrt(Math.pow(this._dx,2)+Math.pow(this._dy,2));
  }
}
