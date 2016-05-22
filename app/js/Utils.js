import SAT from "sat";

const V = SAT.Vector;
const B = SAT.Box;


export function boundingBox(sprite) {

  if(sprite.width === undefined) throw "No width: "+sprite.constructor.name;
  if(sprite.height === undefined) throw "No height!"+sprite.constructor.name;
  if(sprite.pivotX === undefined) throw "No pivotX!"+sprite.constructor.name;
  if(sprite.pivotY === undefined) throw "No pivotY!"+sprite.constructor.name;
  if(sprite.globalAngle === undefined) throw "No global angle!"+sprite.constructor.name;
  if(sprite.globalX === undefined) throw "No globalX!"+sprite.constructor.name;
  if(sprite.globalY === undefined) throw "No globalY!"+sprite.constructor.name;

  const bbox = new B(new V(0,0), sprite.width,sprite.height).toPolygon();

  bbox.translate(-sprite.pivotX, -sprite.pivotY);
  bbox.rotate(sprite.globalAngle + Math.PI/2);
  bbox.translate(sprite.globalX,sprite.globalY);

  return bbox
}

export function isSpritesColliding(s1, s2){
  if(s1 === s2) return false;

  var bb1 = boundingBox(s1);
  var bb2 = boundingBox(s2);

  return SAT.testPolygonPolygon(bb1,bb2);
}

export function isPointInSprite(x,y,sprite){
  var bb = boundingBox(sprite);
  var point = new V(x,y);

  return SAT.pointInPolygon(point,bb);
}
