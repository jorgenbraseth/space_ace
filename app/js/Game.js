import Renderer from "./Renderer";
import KeyControl from "./KeyControl";
import ControllableShip from "./ControllableShip";
import DummyShip from "./DummyShip";

import { isSpritesColliding } from "./Utils"

import {KEY_MAP} from "./Keys";

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


    const PLAYER1_SCHEMATIC = [
      "  GGG  ",
      "GGSSSGG",
      "WWWXWWW",
      "SEEEEES"
    ];

    const PLAYER2_SCHEMATIC = [
      "SGS",
      "WXW",
      " E "
    ];

    const PLAYER1_CONTROLS = {
      ACCELERATE: KEY_MAP.W,
      TURN_CLOCKWISE: KEY_MAP.D,
      TURN_COUNTERCLOCKWISE: KEY_MAP.S,
      FIRE_PRIMARY: KEY_MAP.SPACE
    };

    const PLAYER2_CONTROLS = {
      ACCELERATE: KEY_MAP.UP,
      TURN_CLOCKWISE: KEY_MAP.RIGHT,
      TURN_COUNTERCLOCKWISE: KEY_MAP.LEFT,
      FIRE_PRIMARY: KEY_MAP.NUM_0
    };

    LAYERS.SHIPS.push(new ControllableShip(this, 55,55,0,PLAYER1_SCHEMATIC, PLAYER1_CONTROLS));
    LAYERS.SHIPS.push(new ControllableShip(this, 455,455,0,PLAYER2_SCHEMATIC, PLAYER2_CONTROLS));
    // LAYERS.SHIPS.push(new DummyShip(this,300,300,0,PLAYER2_SCHEMATIC));
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
