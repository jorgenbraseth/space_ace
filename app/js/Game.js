import Renderer from "./Renderer";
import KeyControl from "./KeyControl";
import ControllableShip from "./ControllableShip";
import DummyShip from "./DummyShip";

import { isSpritesColliding } from "./Utils"


const LAYERS = {
  BACKGROUND:[],
  SHIPS:[],
  SHOTS:[],
  OVERLAY:[],
  UI:[]
};

export default class Game {

  constructor(canvas) {
    this.canvas = canvas;
    canvas.focus();
    this._keyControl = new KeyControl(this);

    this.renderer = new Renderer(this);

  }

  get keyControl(){
    return this._keyControl;
  }

  init(){
    this.globalTime = 0;

    LAYERS.SHIPS.push(new ControllableShip(this));
    LAYERS.SHIPS.push(new DummyShip(this));
  }

  tickLayer(sprites){
    sprites.forEach(
      (s)=>s.tick()
    );
  }

  removeShot(toRemove){
    var i = LAYERS.SHOTS.indexOf(toRemove);
    LAYERS.SHOTS.splice(i,1);
  }

  handleCollisions(){
    LAYERS.SHIPS.forEach((ship)=>{
      LAYERS.SHOTS.forEach((shot)=>{
        if(isSpritesColliding(ship,shot) && shot.gun.ship != ship){
          ship.modules.forEach((module)=>{
            if(isSpritesColliding(module,shot)){
              ship.collide(shot);
              shot.collide(module);
            }
          });
        }
      })
    })
  };

  tick(){
    this.globalTime ++;

    this.tickLayer(LAYERS.BACKGROUND);
    this.tickLayer(LAYERS.SHIPS);
    this.tickLayer(LAYERS.SHOTS);
    this.tickLayer(LAYERS.OVERLAY);
    this.tickLayer(LAYERS.UI);

    var collisions = this.handleCollisions();
  }

  draw(){
    this.renderer.render([
      LAYERS.SHIPS,
      LAYERS.SHOTS
    ]);
  }
  run(){
    this.init();

    setInterval(function(){
      this.tick();
      this.draw();
    }.bind(this),1000/60);

  }

  spawn(sprite, layer = "SHOTS"){
    LAYERS.SHOTS.push(sprite);
  }


}
