import Rocket from "../img/falcon.svg";

const DEGREE = (Math.PI/180);

const KEY_MAP = {
  SHIFT: 16, //SHIFT KEY,
  ACCELERATE: 87, //W
  TURN_COUNTERCLOCKWISE: 65, //S
  TURN_CLOCKWISE: 68 //D,
};

const SHIP_SCHEMATIC = [
  "  SSS  ",
  " SSXSS ",
  " SESES "
];

const BLOCK_SIZE = 10;

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
    screen.rotate(90*DEGREE);
    screen.rotate(this.angle);

    screen.translate(-this.centerX,-this.centerY);

    for (var row = 0; row < SHIP_SCHEMATIC.length; row++) {
      var positions = SHIP_SCHEMATIC[row].split("");
      for (var pos = 0; pos < positions.length; pos++) {
        var block = positions[pos];
        screen.save();
        screen.translate(pos*BLOCK_SIZE, row*BLOCK_SIZE);

        if(block==="S"){
          screen.fillStyle = "#999999";
          screen.fillRect(0,0,BLOCK_SIZE,BLOCK_SIZE);
        }else if(block === "X"){
          this.centerX = pos*BLOCK_SIZE + BLOCK_SIZE/2;
          this.centerY = row*BLOCK_SIZE + BLOCK_SIZE/2;
          screen.fillStyle = "#666666";
          screen.fillRect(0,0,BLOCK_SIZE,BLOCK_SIZE);

          screen.fillStyle = "#ff3300";
          screen.beginPath();
          screen.arc(BLOCK_SIZE/2,BLOCK_SIZE/2,BLOCK_SIZE/3,0,2*Math.PI);
          screen.closePath();
          screen.fill();
        }else if(block === "E"){
          screen.fillStyle = "#00aa00";
          screen.beginPath();
          screen.lineTo(0,0);
          screen.lineTo(BLOCK_SIZE,0);
          screen.lineTo(BLOCK_SIZE,BLOCK_SIZE/2);
          screen.lineTo(BLOCK_SIZE/2,BLOCK_SIZE);
          screen.lineTo(0,BLOCK_SIZE/2);


          //TODO: Tegn motor
          screen.closePath();
          screen.fill();
        }
        screen.restore();

      }

    }



    // screen.drawImage(this.img, 0, 0, this.width, this.height);

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
