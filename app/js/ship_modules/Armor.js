import ShipModule from "./ShipModule";
import {loadImage} from "./ImageLoader"
import gfx from "./box.svg";


const MASS = 300;
const ENGINE_POWER = 0;
const TURN_POWER = 0;
const COST = 5;
const HITPOINTS = 50;
const POWER_GENERATION = 0;

export default class Armor extends ShipModule {

  constructor(ship, x,y){
    super(ship, x, y, MASS, ENGINE_POWER, TURN_POWER, COST, HITPOINTS,POWER_GENERATION);

    this.img = loadImage(gfx, ship.color)
  }

  draw(screen){
    screen.save();
    screen.translate(this.x,this.y);
    screen.drawImage(this.img,0,0,this.width,this.height);
    screen.restore();
  }
}
