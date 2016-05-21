import ShipModule from "./ShipModule";

const BLOCK_SIZE = 10;

const MASS = 100;
const ENGINE_POWER = 0;
const TURN_POWER = 0;
const COST = 5;
const HITPOINTS = 50;

export default class Armor extends ShipModule {

  constructor(ship, x,y){
    super(ship, x, y, MASS, ENGINE_POWER, TURN_POWER, COST, HITPOINTS);
  }

  draw(screen){
    screen.save();
    screen.translate(this.x,this.y);
    screen.fillStyle = "#999999";
    screen.fillRect(0,0,BLOCK_SIZE,BLOCK_SIZE);
    screen.restore();
  }
}
