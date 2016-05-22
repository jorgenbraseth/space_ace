import Game from './js/Game';
import ShipPicker from './js/ship_picker/ShipPicker';

var canvas = document.getElementById('game');


const SCHEMS = [
  [
    "  GGG  ",
    " GWSWG ",
    "SEWXWES",
    "  EEE  "
  ],
  [
    "  SGS  ",
    "SEGXGES",
    "  WEW  "
  ],
  [
    "G G",
    "EXW"
  ],
  [
    "SGGGS       ",
    "SGXGS       ",
    "SWWWS       ",
    "SWEWS       ",
    "SE ES       "
  ],
  [
    "GGGGGGGGG",
    "WWWWXWWWW",
    "EEEEEEEEE"
  ]
];

new ShipPicker(canvas,SCHEMS,"Select ship for Player 1").pickShips((schem)=>{
  var s1 = schem;
  new ShipPicker(canvas,SCHEMS,"Select ship for Player 2").pickShips((schem2)=>{
    var s2 = schem2;

    const game = new Game(canvas,[s1], [s2]);
    game.run();

  })

});
