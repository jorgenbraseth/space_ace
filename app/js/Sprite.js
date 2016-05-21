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

  get collide(){
    throw "Unimplemented collide in "+this.constructor.name;
  }

  get pivotX(){
    return this.width/2;
  }

  get pivotY(){
    return this.height/2;
  }

  drawBoundingBox(screen){
    const bbox = boundingBox(this);
    screen.beginPath();
    bbox.points.forEach((p)=>{
      screen.lineTo(p.x,p.y)
    });
    screen.closePath();
    screen.strokeStyle = "orange";
    screen.stroke();

  }

}
