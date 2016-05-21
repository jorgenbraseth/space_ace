const DEGREE = (Math.PI/180);

var x,y,gun;

export default class Bullet {

  constructor(gun, x,y,angle){
    this.gun = gun;
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.angle = angle;
    this.age = 0;

    this.dx = Math.cos(this.angle)*this.speed;
    this.dy = Math.sin(this.angle)*this.speed;
  }

  tick() {
    this.age++;
    this.x += this.dx;
    this.y += this.dy;

    if(this.age > 100){
      this.die();
    }

    this.wrapAroundWorld();
  }

  die(){
    this.gun.game.removeShot(this)
  }


  draw(screen){

    screen.save();
    screen.translate(this.x,this.y);
    screen.rotate(90*DEGREE);
    screen.rotate(this.angle);


    screen.beginPath();
    screen.lineTo(-1,0);
    screen.lineTo(-1,-3);
    screen.lineTo(0,-5);
    screen.lineTo(1,-3);
    screen.lineTo(1,0);

    screen.closePath();
    screen.fillStyle = "red";
    screen.fill();

    screen.restore();
  }

  wrapAroundWorld(){
    var cw = this.gun.game.canvas.getAttribute("width");
    var ch = this.gun.game.canvas.getAttribute("height");
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
