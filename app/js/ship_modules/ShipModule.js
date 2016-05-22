import SAT from "sat";
const V = SAT.Vector;

import Sprite from "../Sprite"

import {BLOCK_SIZE} from "../Constants"

var ship,game;
var x,y,angle;
var _mass,_enginePower, _turnPower, _cost, _hitpoints;

export default class ShipModule extends Sprite {

  constructor(ship, x, y, mass, enginePower, turnPower, cost, hp, powerGeneration, width=BLOCK_SIZE, height=BLOCK_SIZE) {
    super();
    this.x = x;
    this.y = y;

    this._width = width;
    this._height = height;

    this.ship = ship;
    this.game = ship.game;

    this.angle = 0;

    this._mass = mass;
    this._enginePower = enginePower;
    this._turnPower = turnPower;
    this._cost = cost;
    this._hitpoints = hp;
    this._remainingHitpoints = hp;
    this._powerGeneration = powerGeneration;
  }

  get mass(){
    return this._mass;
  }

  get enginePower(){
    return this._enginePower;
  }

  get turnPower(){
    return this._turnPower;
  }

  get cost() {
    return this._cost;
  }

  get hp(){
    return this._hitpoints;
  }

  get powerGeneration(){
    return this._powerGeneration;
  }

  get height(){
      return this._height;
  }

  get globalAngle(){
      return this.angle+this.ship.angle;
  }

  get drawParent(){
      return this.ship;
  }

  get width() {
      return this._width;
  }

  get globalX(){
    return this.worldPos[0];
  }

  get globalY(){
    return this.worldPos[1];
  }

  get worldPos(){
    const shipAngle = this.ship.angle+Math.PI/2;
    const shipCenterOffestX = this.x+BLOCK_SIZE/2 - this.ship.pivotX;
    const shipCenterOffestY = this.y+BLOCK_SIZE/2 - this.ship.pivotY;

    const x = this.ship.x + Math.cos(shipAngle)*(shipCenterOffestX) - Math.sin(shipAngle)*shipCenterOffestY;
    const y = this.ship.y + Math.sin(shipAngle)*(shipCenterOffestX) + Math.cos(shipAngle)*shipCenterOffestY;
    return [x,y];
  }

  recieveDamage(dmg){
    this._remainingHitpoints -= dmg;
    if(this._remainingHitpoints <= 0){
      this.die();
    }
  }

  die(){
    console.log(this.constructor.name+" destroyed!");
    this.ship.removeModule(this);
  }
}
