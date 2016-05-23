import {boundingBox} from "./Utils"

export default class Sprite {


  draw(screen){};
  tick(){};
  get width(){};
  get height(){};
  get globalX(){};
  get globalY(){};
  get globalAngle(){};
  get drawParent(){};

  collide(){}

  get pivotX(){
    return this.width/2;
  }

  get pivotY(){
    return this.height/2;
  }

  get collisionPoly() {
    return boundingBox(this);
  }

  drawCollisionPoly(screen){
    const poly = this.collisionPoly;
    screen.beginPath();

    if(poly.points[0]) {
      poly.points.forEach((p)=> {
        screen.lineTo(p.x, p.y)
      });
    }else{
      console.log(poly);
      screen.lineTo(0,0);
      screen.lineTo(poly.points.x, poly.points.y);
    }
    screen.closePath();
    screen.strokeStyle = "blue";
    screen.stroke();

  }

}
