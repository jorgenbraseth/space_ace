import SAT from "sat";

const V = SAT.Vector;
const B = SAT.Box;


export function boundingBox(sprite) {

  const bbox = new B(new V(0,0), sprite.width,sprite.height).toPolygon();

  bbox.translate(-sprite.pivotX, -sprite.pivotY);
  bbox.rotate(sprite.globalAngle + Math.PI/2);
  bbox.translate(sprite.x,sprite.y);

  return bbox
}

export function isSpritesColliding(s1, s2){
  if(s1 === s2) return false;
  
  var bb1 = boundingBox(s1);
  var bb2 = boundingBox(s2);

  return SAT.testPolygonPolygon(bb1,bb2);
}
