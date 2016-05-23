import Sprite from "../../Sprite"

import SAT from "sat";

const V = SAT.Vector;
const P = SAT.Polygon;
const B = SAT.Box;

import {DEGREE, BLOCK_SIZE} from "../../Constants"

var _x,_y,gun;

export default class Beam extends Sprite {

  constructor(gun){
    super();

    this.gun = gun;
    this._x = this.gun._x;
    this._y = this.gun._y;

    this.damage = 0.2;

    this.dx = Math.cos(this.angle)*this.speed;
    this.dy = Math.sin(this.angle)*this.speed;
  }

  get angle(){
    return this.gun.globalAngle+Math.PI;
  }

  tick() {
    this._x += this.gun._x;
    this._y += this.gun._y;
  }

  die(){
    this.gun.game.removeFromLayer(this)
  }

  draw(screen){
    screen.save();
    screen.translate(this.gun.globalX, this.gun.globalY);
    screen.rotate(90*DEGREE);
    screen.rotate(this.angle);
    screen.translate(-this.pivotX,-this.pivotY);

    screen.beginPath();
    screen.lineTo(0,0);
    screen.lineTo(this.width/2,this.height);
    screen.lineTo(this.width,0);

    screen.closePath();
    screen.fillStyle = this.gun.ship.color;
    screen.fill();

    screen.restore();

    // super.drawCollisionPoly(screen);

  }

  get collisionPoly() {

    var line = new B(new V(0,0),2, -this.height).toPolygon();

    line.translate(-1, 0);
    line.rotate(this.globalAngle + Math.PI/2);
    line.translate(this.globalX,this.globalY);

    return line;
  }

  get width(){
    return 10;
  }

  get height(){
    return 120;
  }

  get pivotX() {
    return this.width/2;
  }

  get pivotY() {
    return 0;
  }

  get worldPos(){
    const shipAngle = this.gun.ship.angle+Math.PI/2;
    const shipCenterOffestX = this.x+BLOCK_SIZE/2 - this.ship.pivotX;
    const shipCenterOffestY = this.y+BLOCK_SIZE/2 - this.ship.pivotY;

    const x = this.ship.x + Math.cos(shipAngle)*(shipCenterOffestX) - Math.sin(shipAngle)*shipCenterOffestY;
    const y = this.ship.y + Math.sin(shipAngle)*(shipCenterOffestX) + Math.cos(shipAngle)*shipCenterOffestY;
    return [x,y];
  }

  get globalX(){
    return this.gun.globalX;
  }

  get globalY(){
    return this.gun.globalY;
  }


  get globalAngle(){
    return this.gun.ship.globalAngle;
  }


  collide(collidedWith){
    collidedWith.recieveDamage(this.damage);
  }
}
