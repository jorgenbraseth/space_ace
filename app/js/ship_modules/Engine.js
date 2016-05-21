const BLOCK_SIZE = 10;

var x;
var y;

export default class Engine {

  constructor(ship,x,y){
    this.x = x;
    this.y = y;
  }

  get mass(){
    return 5;
  }

  get enginePower(){
    return 150;
  }

  get turnPower(){
    return 5;
  }

  get cost() {
    return 50;
  }

  get hp(){
    return 5;
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
  }
}
