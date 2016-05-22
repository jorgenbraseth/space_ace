import Ship from "../Ship"

export default class PickableShip extends Ship {

  constructor(game, x, y, angle, schematic) {
    super(game, x, y, angle, schematic);
  }


  draw(screen){
    if(this.highlighted){
      screen.fillStyle = "rgba(0,0,0,0.1)";
      screen.fillRect(this.x-this.pivotX-5,this.y-this.pivotY-5,this.width+10,this.height+10)
    }

    super.draw(screen);
  }

}
