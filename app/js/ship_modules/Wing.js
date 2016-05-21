import ShipModule from "./ShipModule";

const BLOCK_SIZE = 10;

const MASS = 15;
const ENGINE_POWER = 0;
const TURN_POWER = 350;
const COST = 5;
const HITPOINTS = 10;

var _isOnLeftSide;


export default class Armor extends ShipModule {

  constructor(ship, isOnLeftSide,x,y){
    super(ship, x, y, MASS, ENGINE_POWER, TURN_POWER, COST, HITPOINTS);
    _isOnLeftSide = isOnLeftSide;
  }

  draw(screen){
    screen.save();
    screen.translate(this.x,this.y);

    screen.fillStyle = "#0066ff";
    screen.fillRect(0,0,BLOCK_SIZE,BLOCK_SIZE);

    screen.restore();
  }
}
