import {BLOCK_SIZE} from "../../Constants"

import ShipModule from "../ShipModule"
import Bullet from "./Bullet"


import {KEY_MAP} from "../../Keys"

const MASS = 25;
const ENGINE_POWER = 0;
const TURN_POWER = 0;
const COST = 25;
const HITPOINTS = 10;
const POWER_GENERATION = 0;

export default class Gun extends ShipModule {

  constructor(ship, x, y){
    super(ship, x, y, MASS, ENGINE_POWER, TURN_POWER, COST, HITPOINTS,POWER_GENERATION);

    this.firingRate = 15;
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

    screen.restore();
  }

  tick(){
    if(this.ship._firingPrimary && this.timeToNextFire-- == 0){
      this.timeToNextFire = this.firingRate;
      this.game.spawn(new Bullet(this, ...this.worldPos, this.ship.angle),"SHOTS");
    }
  }


}
