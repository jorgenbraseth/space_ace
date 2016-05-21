
import ShipModule from "./ShipModule";

const BLOCK_SIZE = 10;

var x;
var y;

const MASS = 1;
const ENGINE_POWER = 1;
const TURN_POWER = 5;
const COST = 0;
const HITPOINTS = 5;

export default class Core extends ShipModule {


  constructor(ship, x,y){
    super(ship, x, y, MASS, ENGINE_POWER, TURN_POWER, COST, HITPOINTS);
  }

  draw(screen){
    screen.save();
    screen.translate(this.x,this.y);
    screen.fillStyle = "#666666";
    screen.fillRect(0,0,BLOCK_SIZE,BLOCK_SIZE);

    screen.fillStyle = "#ff3300";
    screen.beginPath();
    screen.arc(BLOCK_SIZE/2,BLOCK_SIZE/2,BLOCK_SIZE/3,0,2*Math.PI);
    screen.closePath();
    screen.fill();

    screen.restore();
  }
}
