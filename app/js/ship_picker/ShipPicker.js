import Ship from "./PickableShip"
import {DEGREE} from "../Constants"
import {isPointInSprite} from "../Utils"

const LAYERS = {
  SHIPS:[],
  UI:[]
};

const PLAYER2_SCHEMATIC = [
  "  SGS  ",
  "SEWXWES",
  "  G G  "
];

var _renderLoop;
var canvas;
var _pickedShip;

export default class ShipPicker {

  constructor(canvas,schems, title) {
    this.schems = schems;
    this.canvas = canvas;
    this.title = title;
    canvas.style.cursor = "auto";
    canvas.focus();

    this.screen = canvas.getContext('2d');
    this.screenWidth = canvas.getAttribute("width");
    this.screenHeight = canvas.getAttribute("height");

    this.init();

  }

  init(){
    this.ships = [];
    var xPos = 300;
    var placed = 0;
    this.schems.forEach((schem)=>{
      this.ships.push(new Ship(this,xPos,Math.floor(placed++/4)*150+150,-90*DEGREE,schem))
      xPos = xPos % 800;
      xPos += 200;
    });

    this.canvas.onmousemove = this.mouseMove.bind(this);
    this.canvas.onclick = this.click.bind(this);
  }

  click(e){
    const x = e.offsetX;
    const y = e.offsetY;
    this.ships.forEach((ship)=>{
      if(isPointInSprite(x,y,ship)){
        this._pickedShip = ship.schematic;
      }

    });
  }
  mouseMove(e){
    const x = e.offsetX;
    const y = e.offsetY;
    var overClickable = false;
    this.ships.forEach((ship)=>{
      var highlighted = isPointInSprite(x,y,ship);
      ship.highlighted = highlighted;

      overClickable = overClickable || highlighted;

    });

    if(overClickable){
      this.canvas.style.cursor = "pointer"
    }else{
      this.canvas.style.cursor = "auto"
    }

  }

  tickLayer(sprites){
    sprites.forEach(
      (s)=>s.tick()
    );
  }

  tick(){
    this.globalTime ++;

    this.tickLayer(LAYERS.SHIPS);
    this.tickLayer(LAYERS.UI);
  }

  draw(){
    const s = this.screen;
    s.save();
    s.fillStyle = "#eeeeee";
    s.fillRect(0,0,this.screenWidth, this.screenHeight);



    s.fillStyle ="#000000";
    s.textAlign = "center";
    s.font = "48px serif";
    s.fillText(this.title,this.screenWidth/2,60);


    this.ships.forEach((s)=>{
      s.draw(this.screen);
    });
    s.restore();
  }

  waitForPick(shipPickedCallback) {
    if (this._pickedShip == undefined) {
      setTimeout(()=>{this.waitForPick(shipPickedCallback)}, 100);
    }else{
      clearInterval(_renderLoop);
      shipPickedCallback(this._pickedShip);
    }
  }

  pickShips(shipPickedCallback){
    this.run();
    this.waitForPick(shipPickedCallback);
  }

  run(){
    this.init();

    _renderLoop = setInterval(function(){
      this.tick();
      this.draw();
    }.bind(this),1000/60);

  }
}
