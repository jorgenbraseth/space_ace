const BLOCK_SIZE = 10;

import ShipModule from "../ShipModule"
import Bullet from "./Bullet"


import {KEY_MAP} from "../../Keys"

var x;
var y;

const MASS = 25;
const ENGINE_POWER = 0;
const TURN_POWER = 0;
const COST = 25;
const HITPOINTS = 10;
const POWER_GENERATION = 0;

export default class Gun extends ShipModule{

  constructor(ship, x, y){
    super(ship, x, y, MASS, ENGINE_POWER, TURN_POWER, COST, HITPOINTS,POWER_GENERATION);
    
    this.firingRate = 15;
    this.timeToNextFire = 0;

    this.shooting = false;
    this.game.keyControl.onKeyDown(KEY_MAP.SPACE, ()=>this.shooting = true);
    this.game.keyControl.onKeyUp(KEY_MAP.SPACE, ()=>this.shooting = false);
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
