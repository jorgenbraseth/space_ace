import ShipModule from "./ShipModule";

const BLOCK_SIZE = 10;


const MASS = 5;
const ENGINE_POWER = 100;
const TURN_POWER = 5;
const COST = 50;
const HITPOINTS = 5;
const POWER_GENERATION = 0;

export default class Engine extends ShipModule {

  constructor(ship,x,y){
    super(ship, x, y, MASS, ENGINE_POWER, TURN_POWER, COST, HITPOINTS,POWER_GENERATION, BLOCK_SIZE, BLOCK_SIZE);
  }

  draw(screen){
    screen.save();
    screen.translate(this.x,this.y);

    screen.fillStyle = "#00aa00";
    screen.beginPath();
    screen.lineTo(0,0);
    screen.lineTo(BLOCK_SIZE,0);
    screen.lineTo(BLOCK_SIZE,BLOCK_SIZE/2);
    screen.lineTo(BLOCK_SIZE/2,BLOCK_SIZE);
    screen.lineTo(0,BLOCK_SIZE/2);
    screen.closePath();
    screen.fill();

    screen.restore();


    // var newScreen = screen.canvas.getContext('2d');
    // newScreen.restore();
    // this.drawBoundingBox(newScreen);
  }
}
