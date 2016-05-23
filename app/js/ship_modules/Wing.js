import ShipModule from "./ShipModule";
import {BLOCK_SIZE} from "../Constants"

import {loadImage} from "./ImageLoader"
import gfx_right from "./wing_right.svg";
import gfx_left from "./wing_left.svg";

const MASS = 50;
const ENGINE_POWER = 0;
const TURN_POWER = 35;
const COST = 5;
const HITPOINTS = 10;
const POWER_GENERATION = 0;

export default class Wing extends ShipModule {

  constructor(ship,x,y){
    super(ship, x, y, MASS, ENGINE_POWER, TURN_POWER, COST, HITPOINTS,POWER_GENERATION, BLOCK_SIZE, BLOCK_SIZE);
    if(x<=this.ship.pivotX){
      this.img = loadImage(gfx_left, ship.color)
    }else{
      this.img = loadImage(gfx_right, ship.color)
    }
  }

  draw(screen){
    screen.save();
    screen.translate(this.x,this.y);

    screen.drawImage(this.img,0,0,this.width,this.height);

    screen.restore();
  }
}
