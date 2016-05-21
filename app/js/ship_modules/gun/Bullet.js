const DEGREE = (Math.PI/180);

var x,y,gun;

export default class Bullet {

  constructor(gun, x,y,angle){
    this.gun = gun;
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.angle = angle;

    this.dx = Math.cos(this.angle)*this.speed;
    this.dy = Math.sin(this.angle)*this.speed;
  }

  tick() {
    this.x += this.dx;
    this.y += this.dy;
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
}
