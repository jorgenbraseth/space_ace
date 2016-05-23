import {BLOCK_SIZE} from "../../Constants"

import ShipModule from "../ShipModule"
import Beam from "./Beam"


const MASS = 150;
const ENGINE_POWER = 0;
const TURN_POWER = 0;
const COST = 75;
const HITPOINTS = 10;
const POWER_GENERATION = 0;


import {loadImage} from "../ImageLoader"
import gfx_base from "./gun_base.svg";
import gfx_turret from "./gun_turret.svg";

export default class Gun extends ShipModule {

  constructor(ship, x, y){
    super(ship, x, y, MASS, ENGINE_POWER, TURN_POWER, COST, HITPOINTS,POWER_GENERATION);

    this.img_base = loadImage(gfx_base, ship.color);
    this.img_turret = loadImage(gfx_turret, ship.color);
  }

  draw(screen){
    screen.save();
    screen.translate(this.x,this.y);

    screen.drawImage(this.img_base,0,0,this.width,this.height);

    screen.fillStyle = this.ship.color;
    var maxWidth = this.width-1;
    screen.fillRect(1,this.height-2,maxWidth*(1-this.reloadTimeLeft/this.timeToReload),1);

    screen.restore();
  }

  tick(){
    if(this.ship._firingPrimary && this._beam === undefined){
      this._beam = new Beam(this);
      this.game.spawn(this._beam,"UNDER_SHIPS");
    }else if(!this.ship._firingPrimary && this._beam !== undefined) {
      this.game.removeFromLayer(this._beam,"UNDER_SHIPS");
      this._beam = undefined;
    }
  }


}
