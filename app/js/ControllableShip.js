import Ship from "./Ship"
import {KEY_MAP} from "./Keys"

const SHIP_SCHEMATIC = [
  "  GGG  ",
  "GGSSSGG",
  "WWWXWWW",
  "SEEEEES"
];

export default class ControllableShip extends Ship {

  constructor(game) {
    super(game, 55,55,0, SHIP_SCHEMATIC);

    this.bindKeys();
  }

  bindKeys() {
    this.game.keyControl.onKeyDown(KEY_MAP.ACCELERATE, ()=> this.accelerating = true);
    this.game.keyControl.onKeyDown(KEY_MAP.TURN_CLOCKWISE, ()=> this._turningCW = true);
    this.game.keyControl.onKeyDown(KEY_MAP.TURN_COUNTERCLOCKWISE, ()=> this._turningCCW = true);

    this.game.keyControl.onKeyUp(KEY_MAP.ACCELERATE, ()=> this.accelerating = false);
    this.game.keyControl.onKeyUp(KEY_MAP.TURN_CLOCKWISE, ()=> this._turningCW = false);
    this.game.keyControl.onKeyUp(KEY_MAP.TURN_COUNTERCLOCKWISE, ()=> this._turningCCW = false);
  }
}
