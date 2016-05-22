export default class Renderer {
  constructor(game){
    this.game = game;
    const canvas = game.canvas;
    this.canvas = canvas;
    this.screen = canvas.getContext('2d');
    this.canvas.style.cursor = "none";
    this.screenWidth = canvas.getAttribute("width");
    this.screenHeight = canvas.getAttribute("height");
  }

  render(sprite_lists){
    this.clearScreen();



    sprite_lists.forEach((sprites)=>
      sprites.forEach((sprite)=> sprite.draw(this.screen))
    );
  }

  clearScreen(){
    this.screen.fillStyle = "rgba(234,234,234,0.55)";
    this.screen.fillRect(0,0,this.screenWidth, this.screenHeight);
  }
}
