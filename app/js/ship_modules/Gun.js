const BLOCK_SIZE = 10;

import {KEY_MAP} from "../Keys"

export default class Gun {

  constructor(game){
    this.game = game;

    this.shooting = false;
    game.keyControl.onKeyDown(KEY_MAP.SPACE, ()=>this.shooting = true);
    game.keyControl.onKeyUp(KEY_MAP.SPACE, ()=>this.shooting = false);
  }

  get mass(){
    return 25;
  }

  get enginePower(){
    return 0;
  }

  get turnPower(){
    return 0;
  }

  get cost() {
    return 25;
  }

  get hp(){
    return 10;
  }

  draw(screen){
    screen.fillStyle = "#333333";
    screen.beginPath();

    screen.lineTo(BLOCK_SIZE,BLOCK_SIZE);
    screen.lineTo(0,BLOCK_SIZE);
    screen.lineTo(0,BLOCK_SIZE*0.3);

    screen.lineTo(BLOCK_SIZE*0.3,BLOCK_SIZE*0.3);
    screen.lineTo(BLOCK_SIZE*0.3,0);
    screen.lineTo(BLOCK_SIZE*0.7,0);
    screen.lineTo(BLOCK_SIZE*0.7,BLOCK_SIZE*0.3);

    screen.lineTo(BLOCK_SIZE,BLOCK_SIZE*0.3);


    screen.closePath();
    screen.fill();
  }

  tick(){
    console.log("Shooting:" + this.shooting);
  }
}
