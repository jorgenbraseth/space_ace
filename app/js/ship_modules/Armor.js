const BLOCK_SIZE = 10;

var x;
var y;

export default class Armor {

  constructor(ship, x,y){
    this.x = x;
    this.y = y;
  }
  
  get mass(){
    return 100;
  }

  get enginePower(){
    return 0;
  }

  get turnPower(){
    return 0;
  }

  get cost() {
    return 5;
  }

  get hp(){
    return 50;
  }

  draw(screen){
    screen.save();
    screen.translate(this.x,this.y);
    screen.fillStyle = "#999999";
    screen.fillRect(0,0,BLOCK_SIZE,BLOCK_SIZE);
    screen.restore();
  }
}
