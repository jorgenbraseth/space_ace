const BLOCK_SIZE = 10;

var x;
var y;

export default class Core {

  constructor(ship, x,y){
    this.x = x;
    this.y = y;
  }

  get mass(){
    return 1;
  }

  get enginePower(){
    return 1;
  }

  get turnPower(){
    return 5;
  }

  get cost() {
    return 0;
  }

  get hp(){
    return 5;
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
