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
    this.x = 100;
    this.y = 100;
    this.width = 53;
    this.height = 42;
    this.centerX = 21;
    this.centerY = 23;

    this.mass = 200;

    this.maxSpeed = 8;
    this.dx = 0;
    this.dy = 0;
    this.enginePower = 15;

    this.angle = 0;
    this.turnPower = 400;

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

    // screen.fillStyle = "red";
    // screen.beginPath();
    // screen.lineTo(0,0);
    // screen.lineTo(0,this.height);
    // screen.lineTo(this.width, this.height/2);
    // screen.closePath();
    // screen.fill();
    //
    // screen.fillStyle = "green";
    // screen.fillRect(-5,0,5,this.height);

    screen.drawImage(this.img, 0, 0, this.width, this.height);
    // screen.fillRect(0,0,this.width,this.height);

    screen.restore();

  }

  get movementAngleRadians(){
    var radians = Math.atan2(this.dy,this.dx);
    return radians;
  }

  get drag(){
    return this.acceleration/4;
  }

  get acceleration() {
    return this.enginePower / this.mass;
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

    if(this.accelerating && this.maxSpeed > (Math.sqrt(Math.pow(this.dx,2)+Math.pow(this.dy,2))) ){
      var accX = Math.cos(this.angle)*this.acceleration;
      this.dx = this.dx + accX;
      if(this.dx > this.maxSpeed){
        this.dx = this.maxSpeed;
      }else if(this.dx < -this.maxSpeed){
        this.dx = -this.maxSpeed;
      }

      var accY = Math.sin(this.angle)*this.acceleration;
      this.dy = this.dy + accY;
      if(this.dy > this.maxSpeed){
        this.dy = this.maxSpeed;
      }else if(this.dy < -this.maxSpeed){
        this.dy = -this.maxSpeed;
      }
    }


    var breakX = Math.cos(this.movementAngleRadians)*this.drag;
    if(breakX < 0){
      this.dx = Math.min(0,this.dx - breakX);
    }else{
      this.dx = Math.max(0,this.dx - breakX);
    }

    var breakY = Math.sin(this.movementAngleRadians)*this.drag;
    if(breakY < 0){
      this.dy = Math.min(0,this.dy - breakY);
    }else{
      this.dy = Math.max(0,this.dy - breakY);
    }


    this.x += this.dx;
    this.y += this.dy;
  }
}
