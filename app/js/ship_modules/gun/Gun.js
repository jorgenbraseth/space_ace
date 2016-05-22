import {BLOCK_SIZE} from "../../Constants"

import ShipModule from "../ShipModule"
import Bullet from "./Bullet"


const MASS = 25;
const ENGINE_POWER = 0;
const TURN_POWER = 0;
const COST = 25;
const HITPOINTS = 10;
const POWER_GENERATION = 0;

export default class Gun extends ShipModule {

  constructor(ship, x, y){
    super(ship, x, y, MASS, ENGINE_POWER, TURN_POWER, COST, HITPOINTS,POWER_GENERATION);

    this.firingRate = 25;
    this.timeToNextFire = 0;
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

    screen.fillStyle = "#ffff00";
    var maxWidth = this.width-1;
    screen.fillRect(1,this.height-2,maxWidth*(1-this.timeToNextFire/this.firingRate),1);

    screen.restore();
  }

  tick(){
    this.timeToNextFire = Math.max(this.timeToNextFire-1,0);
    if(this.ship._firingPrimary && this.timeToNextFire <= 0){
      this.timeToNextFire = this.firingRate;
      this.game.spawn(new Bullet(this, ...this.worldPos, this.ship.angle),"SHOTS");
    }
  }


}
