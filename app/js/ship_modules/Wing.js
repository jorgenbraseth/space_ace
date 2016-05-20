const BLOCK_SIZE = 10;

var _isOnLeftSide;
export default class Armor {

  constructor(isOnLeftSide){
    _isOnLeftSide = isOnLeftSide;
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
    screen.fillStyle = "#0066ff";
    screen.fillRect(0,0,BLOCK_SIZE,BLOCK_SIZE);
  }
}
