import Game from './js/Game';

var canvas = document.getElementById('game');


const PLAYER1_SCHEMATIC = [[
  "  GGG  ",
  " GWSWG ",
  "SEWXWES",
  "  EEE  "
]];

const PLAYER2_SCHEMATIC = [[
  "  SGS  ",
  "SEWXWES",
  "  G G  "
]];

let game = new Game(canvas,PLAYER1_SCHEMATIC, PLAYER2_SCHEMATIC);
game.run();
