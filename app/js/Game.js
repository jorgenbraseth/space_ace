import Renderer from "./Renderer";
import KeyControl from "./KeyControl";
import ControllableShip from "./ControllableShip";
import DummyShip from "./DummyShip";

import SAT from "sat";

const Response = SAT.Response;
const V = SAT.Vector;
const B = SAT.Box;


import { isSpritesColliding } from "./Utils"

import {KEY_MAP} from "./Keys";

const LAYERS = {
  BACKGROUND:[],
  UNDER_SHIPS:[],
  SHIPS:[],
  SHOTS:[],
  OVERLAY:[],
  UI:[]
};

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

export default class Game {

  constructor(canvas, p1_ships, p2_ships) {
    this.canvas = canvas;
    canvas.focus();
    this._keyControl = new KeyControl(this);

    this.p1_ships = p1_ships;
    this.p2_ships = p2_ships;

    this.renderer = new Renderer(this);
  }

  get keyControl(){
    return this._keyControl;
  }

  init(){
    this.globalTime = 0;




    const AI_SCHEMATIC = [
      " WXG ",
      "  E "
    ];

    this.loadNextP1Ship();
    this.loadNextP2Ship();
  }

  loadNextP1Ship(){
    this.p1 = new ControllableShip(
      this,
      Math.floor(Math.random()*this.renderer.screenWidth),
      Math.floor(Math.random()*this.renderer.screenHeight),
      0,
      this.p1_ships.pop(),
      PLAYER1_CONTROLS,
      "#cc9900"
    );

    LAYERS.SHIPS.push(this.p1);
  }
  loadNextP2Ship(){
    this.p2 = new ControllableShip(
      this,
      Math.floor(Math.random()*this.renderer.screenWidth),
      Math.floor(Math.random()*this.renderer.screenHeight),
      0,
      this.p2_ships.pop(),
      PLAYER2_CONTROLS,
      "#0099cc"
    );
    LAYERS.SHIPS.push(this.p2);
  }

  tickLayer(sprites){
    sprites.forEach(
      (s)=>s.tick()
    );
  }

  removeFromLayer(toRemove, layer="SHOTS"){
    var i = LAYERS[layer].indexOf(toRemove);
    LAYERS[layer].splice(i,1);
  }

  removeShip(toRemove){
    var i = LAYERS.SHIPS.indexOf(toRemove);
    LAYERS.SHIPS.splice(i,1);

    if(LAYERS.SHIPS.length == 1){
      alert("Winner!!")
    }
  }
  handleCollisions(){
    LAYERS.SHIPS.forEach((ship)=>{
      LAYERS.SHOTS.concat(LAYERS.UNDER_SHIPS).forEach((shot)=>{
        if(isSpritesColliding(ship,shot) && shot.gun.ship != ship){

          var closestCollison = 1000000;
          var collidingModule = undefined;

          ship.modules.forEach((module)=>{
            var lengthToCollision = new V(module.pivotX,module.pivotY).sub(new V(shot.pivotX,shot.pivotY)).len2();

            if(isSpritesColliding(module,shot) && lengthToCollision < closestCollison){
              collidingModule = module;
            }

          });

          if(collidingModule !== undefined){
            shot.collide(collidingModule);
            collidingModule.collide(shot);
          }

        }
      })
    })
  };

  tick(){
    this.globalTime ++;

    this.tickLayer(LAYERS.BACKGROUND);
    this.tickLayer(LAYERS.UNDER_SHIPS);
    this.tickLayer(LAYERS.SHIPS);
    this.tickLayer(LAYERS.SHOTS);
    this.tickLayer(LAYERS.OVERLAY);
    this.tickLayer(LAYERS.UI);

    var collisions = this.handleCollisions();
  }

  draw(){
    this.renderer.render([
      LAYERS.UNDER_SHIPS,
      LAYERS.SHIPS,
      LAYERS.SHOTS
    ]);
  }
  run(){
    this.init();

    setInterval(function(){
      this.tick();
    }.bind(this),1000/60); //TODO: replace with window.requestAnimationFrame(callback) ?


    this.startAnimLoop();

  }

  startAnimLoop(){
    var that = this;
    window.requestAnimationFrame(function(){
      that.draw();
      that.startAnimLoop();
    })
  }

  spawn(sprite, layer = "SHOTS"){
    LAYERS[layer].push(sprite);
  }


}
