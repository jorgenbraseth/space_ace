import Rocket from "../img/falcon.svg";

const DEGREE = (Math.PI/180);

const KEY_MAP = {
  SHIFT: 16, //SHIFT KEY,
  ACCELERATE: 87, //W
  TURN_COUNTERCLOCKWISE: 65, //S
  TURN_CLOCKWISE: 68 //D,
};

export default class Ship {

  constructor(game){
    this.game = game;
    this.x = 55;
    this.y = 55;
    this.width = 53;
    this.height = 42;
    this.centerX = 21;
    this.centerY = 23;

    this.mass = 45;

    this.dx = 0;
    this.dy = 0;
    this.enginePower = 230;

    this.angle = 0;
    this.turnPower = 220;

    this.turningCCW = false;
    this.turningCW = false;

    this.bindKeys();

    this.img = new Image();
    this.img.src = Rocket;
  }

  bindKeys() {
    this.game.keyControl.onKeyDown(KEY_MAP.ACCELERATE, ()=> this.accelerating = true);
    this.game.keyControl.onKeyDown(KEY_MAP.TURN_CLOCKWISE, ()=> this.turningCW = true);
    this.game.keyControl.onKeyDown(KEY_MAP.TURN_COUNTERCLOCKWISE, ()=> this.turningCCW = true);

    this.game.keyControl.onKeyUp(KEY_MAP.ACCELERATE, ()=> this.accelerating = false);
    this.game.keyControl.onKeyUp(KEY_MAP.TURN_CLOCKWISE, ()=> this.turningCW = false);
    this.game.keyControl.onKeyUp(KEY_MAP.TURN_COUNTERCLOCKWISE, ()=> this.turningCCW = false);
  }


  draw(screen){
    screen.save();
    screen.translate(this.x,this.y);
    screen.rotate(this.angle);
    screen.translate(-this.centerX,-this.centerY);

    screen.drawImage(this.img, 0, 0, this.width, this.height);

    screen.restore();

  }

  get movementAngleRadians(){
    var radians = Math.atan2(this.dy,this.dx);
    return radians;
  }

  get drag(){
    return this.physicsDrag;
  }

  get physicsDrag() {
    const fluidDensity = 0.5;
    const frontalArea = this.mass;
    const speed = Math.sqrt(Math.pow(this.dx,2)+Math.pow(this.dy,2));
    const dragForce = 0.05*fluidDensity*frontalArea*Math.pow(speed,2);

    return dragForce/this.mass;
  }

  get acceleration() {
    return (this.enginePower / this.mass);
  }

  get turnSpeed() {
    return this.turnPower / this.mass * DEGREE;
  }

  tick() {

    if(this.turningCCW){
      this.angle -= this.turnSpeed ;
    }
    if(this.turningCW){
      this.angle += this.turnSpeed ;
    }

    if(this.accelerating ){
      var accX = Math.cos(this.angle)*this.acceleration;
      this.dx = this.dx + accX;

      var accY = Math.sin(this.angle)*this.acceleration;
      this.dy = this.dy + accY;
    }

    var breakX = Math.cos(this.movementAngleRadians)*this.drag;
    this.dx = this.dx - breakX;

    var breakY = Math.sin(this.movementAngleRadians)*this.drag;
    this.dy = this.dy - breakY;


    this.x += this.dx;
    this.y += this.dy;

    var cw = this.game.canvas.getAttribute("width");
    var ch = this.game.canvas.getAttribute("height");
    if(this.x < 0){
      this.x = cw - this.x;
    }else if(this.x > cw){
      this.x = this.x - cw;
    }
    if(this.y < 0){
      this.y = ch - this.y;
    }else if(this.y > ch){
      this.y = this.y - ch;
    }
  }
}
