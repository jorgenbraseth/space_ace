import Ship from "./Ship"



export default class DummyShip extends Ship {

  constructor(game, x, y, angle, schematic) {
    super(game, x, y, angle, schematic);

    this._turningCCW = true;
    this._turningCW = false;
    this.accelerating = true;
    this._firingPrimary = true;

    this.age = Math.floor(Math.random()*1000);
  }

  tick(){
    this.age++;

    if(this.age % 128 == 0){
      this._turningCCW = !this._turningCCW;
    }
    if(this.age % 200 == 0){
      this._turningCW = !this._turningCW;
    }

    super.tick();
  }

}
