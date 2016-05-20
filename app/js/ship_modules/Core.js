const BLOCK_SIZE = 10;

export default class Core {

  get mass(){
    return 1;
  }

  get enginePower(){
    return 0;
  }

  get turnPower(){
    return 0;
  }

  get cost() {
    return 0;
  }

  draw(screen){
    screen.fillStyle = "#666666";
    screen.fillRect(0,0,BLOCK_SIZE,BLOCK_SIZE);

    screen.fillStyle = "#ff3300";
    screen.beginPath();
    screen.arc(BLOCK_SIZE/2,BLOCK_SIZE/2,BLOCK_SIZE/3,0,2*Math.PI);
    screen.closePath();
    screen.fill();
  }
}
