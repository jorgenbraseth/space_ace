import ShipModule from "./ShipModule";

import {BLOCK_SIZE} from "../Constants"

const MASS = 15;
const ENGINE_POWER = 0;
const TURN_POWER = 350;
const COST = 5;
const HITPOINTS = 10;
const POWER_GENERATION = 0;

var _isOnLeftSide;


export default class Wing extends ShipModule {

  constructor(ship, isOnLeftSide,x,y){
    super(ship, x, y, MASS, ENGINE_POWER, TURN_POWER, COST, HITPOINTS,POWER_GENERATION, BLOCK_SIZE, BLOCK_SIZE);
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
