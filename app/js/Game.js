import Renderer from "./Renderer";
import KeyControl from "./KeyControl";
import Ship from "./Ship";


const LAYERS = {
  BACKGROUND:[],
  SHIPS:[],
  OVER_SHIPS:[],
  OVERLAY:[],
  UI:[]
};

export default class Game {

  constructor(canvas) {
    this.canvas = canvas;
    this._keyControl = new KeyControl(this);

    this.renderer = new Renderer(this);
    
  }
  
  get keyControl(){
    return this._keyControl;
  }

  init(){
    this.globalTime = 0;

    LAYERS.SHIPS.push(new Ship(this));
  }

  tickLayer(sprites){
    sprites.forEach(
      (s)=>s.tick()
    );
  }

  tick(){
    this.globalTime ++;

    this.tickLayer(LAYERS.BACKGROUND);
    this.tickLayer(LAYERS.SHIPS);
    this.tickLayer(LAYERS.OVER_SHIPS);
    this.tickLayer(LAYERS.OVERLAY);
    this.tickLayer(LAYERS.UI);
  }

  draw(){
    this.renderer.render(LAYERS.SHIPS);
  }
  run(){
    this.init();

    setInterval(function(){
      this.tick();
      this.draw();
    }.bind(this),1000/60);

  }

  
}
