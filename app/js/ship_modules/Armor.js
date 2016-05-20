const BLOCK_SIZE = 10;

export default class Armor {

  get mass(){
    return 10;
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

  draw(screen){
    screen.fillStyle = "#999999";
    screen.fillRect(0,0,BLOCK_SIZE,BLOCK_SIZE);
  }
}
