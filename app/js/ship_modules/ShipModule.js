
var ship,game;
var x,y,angle;
var _mass,_enginePower, _turnPower, _cost, _hitpoints;

export default class ShipModule {

  constructor(ship, x, y, mass, enginePower, turnPower, cost, hp, powerGeneration) {
    this.x = x;
    this.y = y;

    this.ship = ship;
    this.game = ship.game;

    this.angle = 0;

    this._mass = mass;
    this._enginePower = enginePower;
    this._turnPower = turnPower;
    this._cost = cost;
    this._hitpoints = hp;
    this._powerGeneration = powerGeneration;
  }

  get collisionInfo(){
    return {
      worldPosCenter: this.worldPos,
      width: BLOCK_SIZE,
      height: BLOCK_SIZE,

      transforms: [
        {translate: [this.ship.x, this.ship.y]},
        {rotate:this.ship.angle},
        {translate: [this.x, this.y]}
      ]

    }
  }
  
  get mass(){
    return this._mass;
  }

  get enginePower(){
    return this._enginePower;
  }

  get turnPower(){
    return this._turnPower;
  }

  get cost() {
    return this._cost;
  }

  get hp(){
    return this._hitpoints;
  }
  
  get powerGeneration(){
    return this._powerGeneration;
  }
}
