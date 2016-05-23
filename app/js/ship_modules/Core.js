
import ShipModule from "./ShipModule";

import {BLOCK_SIZE} from "../Constants"

var x;
var y;

const MASS = 5;
const ENGINE_POWER = 0;
const TURN_POWER = 0;
const COST = 0;
const HITPOINTS = 5;
const POWER_GENERATION = 1;

import {loadImage} from "./ImageLoader"
import gfx from "./core.svg";

export default class Core extends ShipModule {


  constructor(ship, x,y){
    super(ship, x, y, MASS, ENGINE_POWER, TURN_POWER, COST, HITPOINTS,POWER_GENERATION);

    this.img = loadImage(gfx, ship.color);
  }

  draw(screen){
    screen.save();
    screen.translate(this.x,this.y);

    screen.drawImage(this.img,0,0,this.width,this.height);
    screen.restore();
  }

  die(){
    super.die();
    this.ship.die();
  }
}
