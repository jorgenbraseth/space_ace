const BLOCK_SIZE = 10;

var _isOnLeftSide;
var x;
var y;
export default class Armor {

  constructor(ship, isOnLeftSide,x,y){
    _isOnLeftSide = isOnLeftSide;
    this.x = x;
    this.y = y;
  }
  get mass(){
    return 15;
  }

  get enginePower(){
    return 0;
  }

  get turnPower(){
    return 350;
  }

  get cost() {
    return 5;
  }

  get hp(){
    return 10;
  }

  draw(screen){
    screen.save();
    screen.translate(this.x,this.y);

    screen.fillStyle = "#0066ff";
    screen.fillRect(0,0,BLOCK_SIZE,BLOCK_SIZE);

    screen.restore();
  }
}
