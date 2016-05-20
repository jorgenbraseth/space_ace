const TOOLBAR_HEIGHT = 120;

export default class Renderer {
  constructor(game){
    const canvas = game.canvas;
    this.canvas = canvas;
    this.screen = canvas.getContext('2d');
    this.canvas.style.cursor = "none";
    this.screenWidth = canvas.getAttribute("width");
    this.screenHeight = canvas.getAttribute("height");

  }

  render(sprites){
    this.clearScreen();
    this.screen.save();
    sprites.forEach((sprite)=> sprite.draw(this.screen));
    this.screen.restore();
  }

  clearScreen(){
    this.screen.fillStyle = "rgba(255,255,255,0.55)";
    // this.screen.clearRect(0,0,this.screenWidth, this.screenHeight);
    this.screen.fillRect(0,0,this.screenWidth, this.screenHeight);
  }
}
