const BLOCK_SIZE = 10;

export default class Engine {

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
    screen.fillStyle = "#00aa00";
    screen.beginPath();
    screen.lineTo(0,0);
    screen.lineTo(BLOCK_SIZE,0);
    screen.lineTo(BLOCK_SIZE,BLOCK_SIZE/2);
    screen.lineTo(BLOCK_SIZE/2,BLOCK_SIZE);
    screen.lineTo(0,BLOCK_SIZE/2);
    screen.closePath();
    screen.fill();
  }
}
