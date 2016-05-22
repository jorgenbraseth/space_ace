import Ship from "./Ship"



export default class DummyShip extends Ship {

  constructor(game, x, y, angle, schematic) {
    super(game, x, y, angle, schematic);

    this._turningCCW = true;
    this._turningCW = false;
    this.accelerating = true;
    this._firingPrimary = true;

  }

}
