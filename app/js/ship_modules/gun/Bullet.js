import Sprite from "../../Sprite"

const DEGREE = (Math.PI/180);

var _x,_y,gun;

export default class Bullet extends Sprite {

  constructor(gun, x,y,angle){
    super();

    this.gun = gun;
    this._x = x;
    this._y = y;
    this.speed = 6;
    this.angle = angle;
    this.age = 0;

    this.damage = 2;

    this.dx = Math.cos(this.angle)*this.speed;
    this.dy = Math.sin(this.angle)*this.speed;
  }

  tick() {
    this.age++;
    this._x += this.dx;
    this._y += this.dy;

    if(this.age > 100){
      this.die();
    }

    this.wrapAroundWorld();
  }

  die(){
    this.gun.game.removeShot(this)
  }

  draw(screen){

    screen.save();
    screen.translate(this._x,this._y);
    screen.rotate(90*DEGREE);
    screen.rotate(this.angle);


    screen.beginPath();
    screen.lineTo(-1,0);
    screen.lineTo(-1,-3);
    screen.lineTo(0,-5);
    screen.lineTo(1,-3);
    screen.lineTo(1,0);

    screen.closePath();
    screen.fillStyle = this.gun.ship.color;
    screen.fill();

    screen.restore();
  }

  wrapAroundWorld(){
    var cw = this.gun.game.canvas.getAttribute("width");
    var ch = this.gun.game.canvas.getAttribute("height");
    if(this._x < 0){
      this._x = cw - this.x;
    }else if(this._x > cw){
      this._x = this._x - cw;
    }
    if(this._y < 0){
      this._y = ch - this._y;
    }else if(this._y > ch){
      this._y = this._y - ch;
    }
  }


  get width(){
    return 2;
  }

  get height(){
    return 5;
  }

  get globalX(){
    return this._x;
  }

  get globalY(){
    return this._y;
  }


  get globalAngle(){
      return this.angle;
  }


  collide(collidedWith){
    collidedWith.recieveDamage(this.damage);
    this.die();
  }
}
