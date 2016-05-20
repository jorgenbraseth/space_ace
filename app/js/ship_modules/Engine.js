const BLOCK_SIZE = 10;

export default class Engine {

  get mass(){
    return 5;
  }

  get enginePower(){
    return 15;
  }

  get turnPower(){
    return 20;
  }

  get cost() {
    return 50;
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
