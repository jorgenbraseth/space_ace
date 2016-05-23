import ShipModule from "./ShipModule";

import {BLOCK_SIZE} from "../Constants"


const MASS = 5;
const ENGINE_POWER = 25;
const TURN_POWER = 5;
const COST = 50;
const HITPOINTS = 5;
const POWER_GENERATION = 0;

import {loadImage} from "./ImageLoader"
import gfx from "./engine.svg";

export default class Engine extends ShipModule {

  constructor(ship,x,y){
    super(ship, x, y, MASS, ENGINE_POWER, TURN_POWER, COST, HITPOINTS,POWER_GENERATION, BLOCK_SIZE, BLOCK_SIZE);

    this.img = loadImage(gfx, ship.color)
  }

  draw(screen){
    screen.save();
    screen.translate(this.x,this.y);


    if(this.ship.accelerating){
      screen.fillStyle = this.ship.color;
      screen.beginPath();
      screen.lineTo(0,0);
      screen.lineTo(BLOCK_SIZE,0);
      screen.lineTo(BLOCK_SIZE/2,BLOCK_SIZE);
      screen.closePath();
      screen.fill();
    }

    screen.drawImage(this.img,0,0,this.width,this.height);

    screen.restore();

  }
}
