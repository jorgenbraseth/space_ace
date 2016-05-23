import Ship from "./Ship"

export default class ControllableShip extends Ship {

  constructor(game, x, y , angle, schematic, keyBindings,color) {
    super(game, x,y,angle, schematic,color);
    this.keyBindings = keyBindings;

    this.bindKeys(keyBindings);
  }

  bindKeys(keyBindings) {
    this.game.keyControl.onKeyDown(keyBindings.ACCELERATE, ()=> this.accelerating = true);
    this.game.keyControl.onKeyDown(keyBindings.TURN_CLOCKWISE, ()=> this._turningCW = true);
    this.game.keyControl.onKeyDown(keyBindings.TURN_COUNTERCLOCKWISE, ()=> this._turningCCW = true);
    this.game.keyControl.onKeyDown(keyBindings.FIRE_PRIMARY, ()=> this._firingPrimary = true);

    this.game.keyControl.onKeyUp(keyBindings.ACCELERATE, ()=> this.accelerating = false);
    this.game.keyControl.onKeyUp(keyBindings.TURN_CLOCKWISE, ()=> this._turningCW = false);
    this.game.keyControl.onKeyUp(keyBindings.TURN_COUNTERCLOCKWISE, ()=> this._turningCCW = false);
    this.game.keyControl.onKeyUp(keyBindings.FIRE_PRIMARY, ()=> this._firingPrimary = false);
  }
}
