const BLOCK_SIZE = 10;

import Bullet from "./Bullet"

import {KEY_MAP} from "../../Keys"

var x;
var y;

export default class Gun {

  constructor(ship, x, y){
    this.x = x;
    this.y = y;
    this.ship = ship;
    this.game = ship.game;
    this.angle = 0;

    this.firingRate = 15;
    this.timeToNextFire = 0;

    this.shooting = false;
    this.game.keyControl.onKeyDown(KEY_MAP.SPACE, ()=>this.shooting = true);
    this.game.keyControl.onKeyUp(KEY_MAP.SPACE, ()=>this.shooting = false);
  }

  get mass(){
    return 25;
  }

  get enginePower(){
    return 0;
  }

  get turnPower(){
    return 0;
  }

  get cost() {
    return 25;
  }

  get hp(){
    return 10;
  }
  
  get collisionInfo(){
    return {
      worldPosCenter: this.worldPos,
      width: BLOCK_SIZE,
      height: BLOCK_SIZE,
      
      transforms: [
        {translate: [this.ship.x, this.ship.y]},
        {rotate:this.ship.angle},
        {translate: [this.x, this.y]}
      ]
      
    }
  }

  draw(screen){
    screen.save();
    screen.translate(this.x,this.y);

    screen.fillStyle = "#333333";
    screen.beginPath();

    screen.lineTo(BLOCK_SIZE,BLOCK_SIZE);
    screen.lineTo(0,BLOCK_SIZE);
    screen.lineTo(0,BLOCK_SIZE*0.3);

    screen.lineTo(BLOCK_SIZE*0.3,BLOCK_SIZE*0.3);
    screen.lineTo(BLOCK_SIZE*0.3,0);
    screen.lineTo(BLOCK_SIZE*0.7,0);
    screen.lineTo(BLOCK_SIZE*0.7,BLOCK_SIZE*0.3);

    screen.lineTo(BLOCK_SIZE,BLOCK_SIZE*0.3);


    screen.closePath();
    screen.fill();

    screen.restore();
  }

  tick(){
    if(this.shooting && this.timeToNextFire-- == 0){
      this.timeToNextFire = this.firingRate;
      this.game.spawn(new Bullet(this, ...this.worldPos, this.ship.angle),"OVER_SHIPS");
    }
  }

  get worldPos(){
    const shipAngle = this.ship.angle+Math.PI/2;
    const shipCenterOffestX = this.x+BLOCK_SIZE/2 - this.ship.centerX;
    const shipCenterOffestY = this.y+BLOCK_SIZE/2 - this.ship.centerY;

    const x = this.ship.x + Math.cos(shipAngle)*(shipCenterOffestX) - Math.sin(shipAngle)*shipCenterOffestY  ;
    const y = this.ship.y + Math.sin(shipAngle)*(shipCenterOffestX) + Math.cos(shipAngle)*shipCenterOffestY;

    return [x,y];
  }
}
