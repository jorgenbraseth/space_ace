/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Game = __webpack_require__(2);
	
	var _Game2 = _interopRequireDefault(_Game);
	
	var _ShipPicker = __webpack_require__(34);
	
	var _ShipPicker2 = _interopRequireDefault(_ShipPicker);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var canvas = document.getElementById('game');
	
	var SCHEMS = [["WGB", " XE"], ["  GGG  ", " GWSWG ", "SEWXWES", "  EEE  "], ["  G", " GGG", "GGGGG", "WWXWW  ", "EEEEE  "], ["     SSS        ", "  SSSGGGSSS     ", " SGGGGGGGGGS    ", "SWWGGGGGGGWWS   ", "SWWWWWXWWWWWS   ", "SWW WWWWW WWS   ", "EEWSSWWWSSWEE   ", "  EEESSSEEE     ", "     EEE        "], ["WBBBW", " EXE"], ["WBW", "EXE"], ["     SSS        ", "  SSSBBBSSS     ", " SGGGBBBGGGS    ", "SWWGGBBBGGWWS   ", "SWWWWWXWWWWWS   ", "SWW WWWWW WWS   ", "EEWSSWWWSSWEE   ", "  EEESSSEEE     ", "     EEE        "]];
	
	new _ShipPicker2.default(canvas, SCHEMS, "Select ship for Player 1").pickShips(function (schem) {
	  var s1 = schem;
	  new _ShipPicker2.default(canvas, SCHEMS, "Select ship for Player 2").pickShips(function (schem2) {
	    var s2 = schem2;
	
	    var game = new _Game2.default(canvas, [s1], [s2]);
	    game.run();
	  });
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Renderer = __webpack_require__(3);
	
	var _Renderer2 = _interopRequireDefault(_Renderer);
	
	var _KeyControl = __webpack_require__(4);
	
	var _KeyControl2 = _interopRequireDefault(_KeyControl);
	
	var _ControllableShip = __webpack_require__(5);
	
	var _ControllableShip2 = _interopRequireDefault(_ControllableShip);
	
	var _DummyShip = __webpack_require__(32);
	
	var _DummyShip2 = _interopRequireDefault(_DummyShip);
	
	var _sat = __webpack_require__(9);
	
	var _sat2 = _interopRequireDefault(_sat);
	
	var _Utils = __webpack_require__(8);
	
	var _Keys = __webpack_require__(33);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Response = _sat2.default.Response;
	var V = _sat2.default.Vector;
	var B = _sat2.default.Box;
	
	var LAYERS = {
	  BACKGROUND: [],
	  UNDER_SHIPS: [],
	  SHIPS: [],
	  SHOTS: [],
	  OVERLAY: [],
	  UI: []
	};
	
	var PLAYER1_CONTROLS = {
	  ACCELERATE: _Keys.KEY_MAP.W,
	  TURN_CLOCKWISE: _Keys.KEY_MAP.D,
	  TURN_COUNTERCLOCKWISE: _Keys.KEY_MAP.S,
	  FIRE_PRIMARY: _Keys.KEY_MAP.SPACE
	};
	
	var PLAYER2_CONTROLS = {
	  ACCELERATE: _Keys.KEY_MAP.UP,
	  TURN_CLOCKWISE: _Keys.KEY_MAP.RIGHT,
	  TURN_COUNTERCLOCKWISE: _Keys.KEY_MAP.LEFT,
	  FIRE_PRIMARY: _Keys.KEY_MAP.NUM_0
	};
	
	var Game = function () {
	  function Game(canvas, p1_ships, p2_ships) {
	    _classCallCheck(this, Game);
	
	    this.canvas = canvas;
	    canvas.focus();
	    this._keyControl = new _KeyControl2.default(this);
	
	    this.p1_ships = p1_ships;
	    this.p2_ships = p2_ships;
	
	    this.renderer = new _Renderer2.default(this);
	  }
	
	  _createClass(Game, [{
	    key: "init",
	    value: function init() {
	      this.globalTime = 0;
	
	      var AI_SCHEMATIC = [" WXG ", "  E "];
	
	      this.loadNextP1Ship();
	      this.loadNextP2Ship();
	    }
	  }, {
	    key: "loadNextP1Ship",
	    value: function loadNextP1Ship() {
	      this.p1 = new _ControllableShip2.default(this, Math.floor(Math.random() * this.renderer.screenWidth), Math.floor(Math.random() * this.renderer.screenHeight), 0, this.p1_ships.pop(), PLAYER1_CONTROLS, "#cc9900");
	
	      LAYERS.SHIPS.push(this.p1);
	    }
	  }, {
	    key: "loadNextP2Ship",
	    value: function loadNextP2Ship() {
	      this.p2 = new _ControllableShip2.default(this, Math.floor(Math.random() * this.renderer.screenWidth), Math.floor(Math.random() * this.renderer.screenHeight), 0, this.p2_ships.pop(), PLAYER2_CONTROLS, "#0099cc");
	      LAYERS.SHIPS.push(this.p2);
	    }
	  }, {
	    key: "tickLayer",
	    value: function tickLayer(sprites) {
	      sprites.forEach(function (s) {
	        return s.tick();
	      });
	    }
	  }, {
	    key: "removeFromLayer",
	    value: function removeFromLayer(toRemove) {
	      var layer = arguments.length <= 1 || arguments[1] === undefined ? "SHOTS" : arguments[1];
	
	      var i = LAYERS[layer].indexOf(toRemove);
	      LAYERS[layer].splice(i, 1);
	    }
	  }, {
	    key: "removeShip",
	    value: function removeShip(toRemove) {
	      var i = LAYERS.SHIPS.indexOf(toRemove);
	      LAYERS.SHIPS.splice(i, 1);
	
	      if (LAYERS.SHIPS.length == 1) {
	        alert("Winner!!");
	      }
	    }
	  }, {
	    key: "handleCollisions",
	    value: function handleCollisions() {
	      LAYERS.SHIPS.forEach(function (ship) {
	        LAYERS.SHOTS.concat(LAYERS.UNDER_SHIPS).forEach(function (shot) {
	          if ((0, _Utils.isSpritesColliding)(ship, shot) && shot.gun.ship != ship) {
	
	            var closestCollison = 1000000;
	            var collidingModule = undefined;
	
	            ship.modules.forEach(function (module) {
	              var lengthToCollision = new V(module.pivotX, module.pivotY).sub(new V(shot.pivotX, shot.pivotY)).len2();
	
	              if ((0, _Utils.isSpritesColliding)(module, shot) && lengthToCollision < closestCollison) {
	                collidingModule = module;
	              }
	            });
	
	            if (collidingModule !== undefined) {
	              shot.collide(collidingModule);
	              collidingModule.collide(shot);
	            }
	          }
	        });
	      });
	    }
	  }, {
	    key: "tick",
	    value: function tick() {
	      this.globalTime++;
	
	      this.tickLayer(LAYERS.BACKGROUND);
	      this.tickLayer(LAYERS.UNDER_SHIPS);
	      this.tickLayer(LAYERS.SHIPS);
	      this.tickLayer(LAYERS.SHOTS);
	      this.tickLayer(LAYERS.OVERLAY);
	      this.tickLayer(LAYERS.UI);
	
	      var collisions = this.handleCollisions();
	    }
	  }, {
	    key: "draw",
	    value: function draw() {
	      this.renderer.render([LAYERS.UNDER_SHIPS, LAYERS.SHIPS, LAYERS.SHOTS]);
	    }
	  }, {
	    key: "run",
	    value: function run() {
	      this.init();
	
	      setInterval(function () {
	        this.tick();
	      }.bind(this), 1000 / 60); //TODO: replace with window.requestAnimationFrame(callback) ?
	
	      this.startAnimLoop();
	    }
	  }, {
	    key: "startAnimLoop",
	    value: function startAnimLoop() {
	      var that = this;
	      window.requestAnimationFrame(function () {
	        that.draw();
	        that.startAnimLoop();
	      });
	    }
	  }, {
	    key: "spawn",
	    value: function spawn(sprite) {
	      var layer = arguments.length <= 1 || arguments[1] === undefined ? "SHOTS" : arguments[1];
	
	      LAYERS[layer].push(sprite);
	    }
	  }, {
	    key: "keyControl",
	    get: function get() {
	      return this._keyControl;
	    }
	  }]);
	
	  return Game;
	}();
	
	exports.default = Game;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Renderer = function () {
	  function Renderer(game) {
	    _classCallCheck(this, Renderer);
	
	    this.game = game;
	    var canvas = game.canvas;
	    this.canvas = canvas;
	    this.screen = canvas.getContext('2d');
	    this.canvas.style.cursor = "none";
	    this.screenWidth = canvas.getAttribute("width");
	    this.screenHeight = canvas.getAttribute("height");
	  }
	
	  _createClass(Renderer, [{
	    key: "render",
	    value: function render(sprite_lists) {
	      var _this = this;
	
	      this.clearScreen();
	
	      sprite_lists.forEach(function (sprites) {
	        return sprites.forEach(function (sprite) {
	          return sprite.draw(_this.screen);
	        });
	      });
	    }
	  }, {
	    key: "clearScreen",
	    value: function clearScreen() {
	      this.screen.fillStyle = "rgba(234,234,234,0.55)";
	      this.screen.fillRect(0, 0, this.screenWidth, this.screenHeight);
	    }
	  }]);
	
	  return Renderer;
	}();
	
	exports.default = Renderer;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var KeyControl = function () {
	  function KeyControl(game) {
	    _classCallCheck(this, KeyControl);
	
	    this.canvas = game.canvas;
	
	    this.keyCallbacks = {};
	    this.keyUpCallbacks = {};
	
	    this.canvas.onkeydown = this.triggerKeyDownCallbacks.bind(this);
	
	    this.canvas.onkeyup = function (e) {
	      var callbacks = this.keyUpCallbacks[e.keyCode];
	      if (callbacks) {
	        for (var cb = 0; cb < callbacks.length; cb++) {
	          callbacks[cb]();
	        }
	      }
	    }.bind(this);
	  }
	
	  _createClass(KeyControl, [{
	    key: "triggerKeyDownCallbacks",
	    value: function triggerKeyDownCallbacks(e) {
	      var keyCode = e.keyCode;
	      // console.log(keyCode);
	      var callbacks = this.keyCallbacks[keyCode];
	      if (callbacks) {
	        for (var cb = 0; cb < callbacks.length; cb++) {
	          callbacks[cb]();
	        }
	      }
	    }
	  }, {
	    key: "onKeyDown",
	    value: function onKeyDown(key, callback) {
	      if (this.keyCallbacks[key] === undefined) {
	        this.keyCallbacks[key] = [];
	      }
	      this.keyCallbacks[key].push(callback);
	    }
	  }, {
	    key: "onKeyUp",
	    value: function onKeyUp(key, callback) {
	      if (this.keyUpCallbacks[key] === undefined) {
	        this.keyUpCallbacks[key] = [];
	      }
	      this.keyUpCallbacks[key].push(callback);
	    }
	  }]);
	
	  return KeyControl;
	}();
	
	exports.default = KeyControl;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Ship2 = __webpack_require__(6);
	
	var _Ship3 = _interopRequireDefault(_Ship2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ControllableShip = function (_Ship) {
	  _inherits(ControllableShip, _Ship);
	
	  function ControllableShip(game, x, y, angle, schematic, keyBindings, color) {
	    _classCallCheck(this, ControllableShip);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ControllableShip).call(this, game, x, y, angle, schematic, color));
	
	    _this.keyBindings = keyBindings;
	
	    _this.bindKeys(keyBindings);
	    return _this;
	  }
	
	  _createClass(ControllableShip, [{
	    key: "bindKeys",
	    value: function bindKeys(keyBindings) {
	      var _this2 = this;
	
	      this.game.keyControl.onKeyDown(keyBindings.ACCELERATE, function () {
	        return _this2.accelerating = true;
	      });
	      this.game.keyControl.onKeyDown(keyBindings.TURN_CLOCKWISE, function () {
	        return _this2._turningCW = true;
	      });
	      this.game.keyControl.onKeyDown(keyBindings.TURN_COUNTERCLOCKWISE, function () {
	        return _this2._turningCCW = true;
	      });
	      this.game.keyControl.onKeyDown(keyBindings.FIRE_PRIMARY, function () {
	        return _this2._firingPrimary = true;
	      });
	
	      this.game.keyControl.onKeyUp(keyBindings.ACCELERATE, function () {
	        return _this2.accelerating = false;
	      });
	      this.game.keyControl.onKeyUp(keyBindings.TURN_CLOCKWISE, function () {
	        return _this2._turningCW = false;
	      });
	      this.game.keyControl.onKeyUp(keyBindings.TURN_COUNTERCLOCKWISE, function () {
	        return _this2._turningCCW = false;
	      });
	      this.game.keyControl.onKeyUp(keyBindings.FIRE_PRIMARY, function () {
	        return _this2._firingPrimary = false;
	      });
	    }
	  }]);
	
	  return ControllableShip;
	}(_Ship3.default);
	
	exports.default = ControllableShip;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Sprite2 = __webpack_require__(7);
	
	var _Sprite3 = _interopRequireDefault(_Sprite2);
	
	var _Engine = __webpack_require__(12);
	
	var _Engine2 = _interopRequireDefault(_Engine);
	
	var _Core = __webpack_require__(17);
	
	var _Core2 = _interopRequireDefault(_Core);
	
	var _Armor = __webpack_require__(19);
	
	var _Armor2 = _interopRequireDefault(_Armor);
	
	var _Wing = __webpack_require__(21);
	
	var _Wing2 = _interopRequireDefault(_Wing);
	
	var _Gun = __webpack_require__(24);
	
	var _Gun2 = _interopRequireDefault(_Gun);
	
	var _BeamWeapon = __webpack_require__(28);
	
	var _BeamWeapon2 = _interopRequireDefault(_BeamWeapon);
	
	var _Constants = __webpack_require__(14);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _x, _y, _dx, _dy, _width, _height, _angle, _pivotX, _pivotY;
	var _enginePower, _turnPower, _mass, _cost;
	
	var _turningCW, _turningCCW, _accelerating, _firingPrimary;
	var _modules;
	
	var DRAW_BOUNDING_BOX = false;
	
	var Ship = function (_Sprite) {
	  _inherits(Ship, _Sprite);
	
	  function Ship(game, x, y, angle, schematic) {
	    var color = arguments.length <= 5 || arguments[5] === undefined ? "#ff6633" : arguments[5];
	
	    _classCallCheck(this, Ship);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Ship).call(this));
	
	    _this.schematic = schematic.filter(function (row) {
	      return !row.match(/^\s*$/);
	    });
	
	    _this.color = color;
	    _this.game = game;
	    _this._x = x;
	    _this._y = y;
	    _this._dx = 0;
	    _this._dy = 0;
	
	    _this._firingPrimary = false;
	
	    _this._accelerating = false;
	
	    _this._angle = angle;
	
	    _this._turningCCW = false;
	    _this._turningCW = false;
	
	    _this.loadParts();
	    return _this;
	  }
	
	  _createClass(Ship, [{
	    key: "removeModule",
	    value: function removeModule(moduleToRemove) {
	      for (var y = 0; y < this._modules.length; y++) {
	        var row = this._modules[y];
	        for (var x = 0; x < row.length; x++) {
	          var module = row[x];
	
	          if (module === moduleToRemove) {
	            this._modules[y][x] = undefined;
	            this.recalculateAggregateProperties();
	          }
	        }
	      }
	    }
	  }, {
	    key: "findPivot",
	    value: function findPivot() {
	      for (var row = 0; row < this.schematic.length; row++) {
	        var positions = this.schematic[row].split("");
	        for (var pos = 0; pos < positions.length; pos++) {
	          var block = positions[pos];
	          if (block === "X") {
	            this._pivotX = pos * _Constants.BLOCK_SIZE + _Constants.BLOCK_SIZE / 2;
	            this._pivotY = row * _Constants.BLOCK_SIZE + _Constants.BLOCK_SIZE / 2;
	          }
	        }
	      }
	    }
	  }, {
	    key: "loadParts",
	    value: function loadParts() {
	      this.findPivot();
	
	      this._modules = [];
	
	      for (var row = 0; row < this.schematic.length; row++) {
	        var y = row * _Constants.BLOCK_SIZE;
	
	        var partsRow = [];
	        this._modules.push(partsRow);
	        var positions = this.schematic[row].split("");
	
	        for (var pos = 0; pos < positions.length; pos++) {
	          var x = pos * _Constants.BLOCK_SIZE;
	
	          var block = positions[pos];
	          if (block === "E") {
	            var engine = new _Engine2.default(this, x, y);
	            partsRow.push(engine);
	          } else if (block === "S") {
	            partsRow.push(new _Armor2.default(this, x, y));
	          } else if (block === "G") {
	            var gun = new _Gun2.default(this, x, y);
	            partsRow.push(gun);
	          } else if (block === "W") {
	            partsRow.push(new _Wing2.default(this, x, y));
	          } else if (block === "B") {
	            partsRow.push(new _BeamWeapon2.default(this, x, y));
	          } else if (block === "X") {
	
	            partsRow.push(new _Core2.default(this, x, y));
	          } else {
	            partsRow.push(undefined);
	          }
	        }
	      }
	
	      this.recalculateAggregateProperties();
	      this.calculateWidthAndHeight();
	    }
	  }, {
	    key: "recalculateAggregateProperties",
	    value: function recalculateAggregateProperties() {
	      var allParts = this.modules;
	
	      this._mass = allParts.map(function (p) {
	        return p.mass;
	      }).reduce(function (a, b) {
	        return a + b;
	      }, 0);
	      this._enginePower = allParts.map(function (p) {
	        return p.enginePower;
	      }).reduce(function (a, b) {
	        return a + b;
	      }, 0);
	      this._turnPower = allParts.map(function (p) {
	        return p.turnPower;
	      }).reduce(function (a, b) {
	        return a + b;
	      }, 0);
	      this._cost = allParts.map(function (p) {
	        return p.cost;
	      }).reduce(function (a, b) {
	        return a + b;
	      }, 0);
	
	      this.modulesThatTick = allParts.filter(function (p) {
	        return p.tick != undefined;
	      });
	    }
	  }, {
	    key: "calculateWidthAndHeight",
	    value: function calculateWidthAndHeight() {
	      var lowestX = 1000;
	      var lowestY = 1000;
	      var highestX = -1;
	      var highestY = -1;
	      for (var y = 0; y < this._modules.length; y++) {
	        var row = this._modules[y];
	        for (var x = 0; x < row.length; x++) {
	          var module = row[x];
	          if (module !== undefined) {
	            if (x < lowestX) {
	              lowestX = x;
	            }
	            if (x > highestX) {
	              highestX = x;
	            }
	            if (y < lowestY) {
	              lowestY = y;
	            }
	            if (y > highestY) {
	              highestY = y;
	            }
	          }
	        }
	      }
	
	      this._width = (highestX - lowestX + 1) * _Constants.BLOCK_SIZE;
	      this._height = (highestY - lowestY + 1) * _Constants.BLOCK_SIZE;
	    }
	  }, {
	    key: "draw",
	    value: function draw(screen) {
	      screen.save();
	      screen.translate(this._x, this._y);
	      screen.rotate(90 * _Constants.DEGREE);
	      screen.rotate(this._angle);
	
	      screen.translate(-this.pivotX, -this.pivotY);
	
	      for (var row = 0; row < this._modules.length; row++) {
	        var positions = this._modules[row];
	        for (var pos = 0; pos < positions.length; pos++) {
	          var block = positions[pos];
	          if (block != undefined) {
	            block.draw(screen);
	          }
	        }
	      }
	      screen.restore();
	
	      if (DRAW_BOUNDING_BOX) {
	        this.drawCollisionPoly(screen);
	      }
	    }
	  }, {
	    key: "collide",
	    value: function collide(collidedWith) {}
	  }, {
	    key: "tickModules",
	    value: function tickModules() {
	      this.modulesThatTick.forEach(function (m) {
	        return m.tick();
	      });
	    }
	  }, {
	    key: "tick",
	    value: function tick() {
	      this.tickModules();
	
	      this.calculateNewAngle();
	      this.calculateNewSpeeds();
	      this.moveAccordingToSpeed();
	
	      this.wrapAroundWorld();
	    }
	  }, {
	    key: "moveAccordingToSpeed",
	    value: function moveAccordingToSpeed() {
	      this._x += this._dx;
	      this._y += this._dy;
	    }
	  }, {
	    key: "wrapAroundWorld",
	    value: function wrapAroundWorld() {
	      var cw = this.game.canvas.getAttribute("width");
	      var ch = this.game.canvas.getAttribute("height");
	      if (this._x < 0) {
	        this._x = cw - this._x;
	      } else if (this._x > cw) {
	        this._x = this._x - cw;
	      }
	      if (this._y < 0) {
	        this._y = ch - this._y;
	      } else if (this._y > ch) {
	        this._y = this._y - ch;
	      }
	    }
	  }, {
	    key: "calculateNewAngle",
	    value: function calculateNewAngle() {
	      if (this._turningCCW) {
	        this._angle -= this.turnSpeed;
	      }
	      if (this._turningCW) {
	        this._angle += this.turnSpeed;
	      }
	    }
	  }, {
	    key: "calculateNewSpeeds",
	    value: function calculateNewSpeeds() {
	      if (this.accelerating) {
	        var accX = Math.cos(this._angle) * this.acceleration;
	        this._dx = this._dx + accX;
	
	        var accY = Math.sin(this._angle) * this.acceleration;
	        this._dy = this._dy + accY;
	      }
	
	      var breakX = Math.cos(this.movementAngleRadians) * this.drag;
	      this._dx = this._dx - breakX;
	
	      var breakY = Math.sin(this.movementAngleRadians) * this.drag;
	      this._dy = this._dy - breakY;
	
	      if (this.speed < 0.4 && !this.accelerating) {
	        this._dx = 0;
	        this._dy = 0;
	      }
	    }
	  }, {
	    key: "die",
	    value: function die() {
	      console.log("Ship destroyed!");
	      this.game.removeShip(this);
	    }
	  }, {
	    key: "globalAngle",
	    get: function get() {
	      return this._angle;
	    }
	  }, {
	    key: "width",
	    get: function get() {
	      return this._width;
	    }
	  }, {
	    key: "height",
	    get: function get() {
	      return this._height;
	    }
	  }, {
	    key: "globalX",
	    get: function get() {
	      return this._x;
	    }
	  }, {
	    key: "globalY",
	    get: function get() {
	      return this._y;
	    }
	  }, {
	    key: "drawParent",
	    get: function get() {
	      return undefined;
	    }
	  }, {
	    key: "pivotX",
	    get: function get() {
	      return this._pivotX;
	    }
	  }, {
	    key: "pivotY",
	    get: function get() {
	      return this._pivotY;
	    }
	  }, {
	    key: "x",
	    get: function get() {
	      return this._x;
	    }
	  }, {
	    key: "y",
	    get: function get() {
	      return this._y;
	    }
	  }, {
	    key: "accelerating",
	    get: function get() {
	      return this._accelerating;
	    },
	    set: function set(isAccelerating) {
	      this._accelerating = isAccelerating;
	    }
	  }, {
	    key: "enginePower",
	    get: function get() {
	      return this._enginePower;
	    }
	  }, {
	    key: "mass",
	    get: function get() {
	      return this._mass;
	    }
	  }, {
	    key: "turnPower",
	    get: function get() {
	      return this._turnPower;
	    }
	  }, {
	    key: "cost",
	    get: function get() {
	      return this._cost;
	    }
	  }, {
	    key: "modules",
	    get: function get() {
	      return [].concat.apply([], this._modules).filter(function (p) {
	        return p != undefined;
	      });
	    }
	  }, {
	    key: "movementAngleRadians",
	    get: function get() {
	      var radians = Math.atan2(this._dy, this._dx);
	      return radians;
	    }
	  }, {
	    key: "drag",
	    get: function get() {
	      return this.physicsDrag;
	    }
	  }, {
	    key: "physicsDrag",
	    get: function get() {
	      var fluidDensity = 0.2;
	      var frontalArea = this.mass;
	      var speed = Math.sqrt(Math.pow(this._dx, 2) + Math.pow(this._dy, 2));
	      var dragForce = 0.05 * fluidDensity * frontalArea * Math.pow(speed, 2);
	
	      return dragForce / this.mass;
	    }
	  }, {
	    key: "acceleration",
	    get: function get() {
	      return this.enginePower / this.mass;
	    }
	  }, {
	    key: "turnSpeed",
	    get: function get() {
	      return Math.pow(this.turnPower, 2) / Math.pow(this.mass, 2);
	    }
	  }, {
	    key: "angle",
	    get: function get() {
	      return this._angle;
	    }
	  }, {
	    key: "speed",
	    get: function get() {
	      return Math.sqrt(Math.pow(this._dx, 2) + Math.pow(this._dy, 2));
	    }
	  }]);
	
	  return Ship;
	}(_Sprite3.default);
	
	exports.default = Ship;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Utils = __webpack_require__(8);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Sprite = function () {
	  function Sprite() {
	    _classCallCheck(this, Sprite);
	  }
	
	  _createClass(Sprite, [{
	    key: "draw",
	    value: function draw(screen) {}
	  }, {
	    key: "tick",
	    value: function tick() {}
	  }, {
	    key: "collide",
	    value: function collide() {}
	  }, {
	    key: "drawCollisionPoly",
	    value: function drawCollisionPoly(screen) {
	      var poly = this.collisionPoly;
	      screen.beginPath();
	
	      if (poly.points[0]) {
	        poly.points.forEach(function (p) {
	          screen.lineTo(p.x, p.y);
	        });
	      } else {
	        console.log(poly);
	        screen.lineTo(0, 0);
	        screen.lineTo(poly.points.x, poly.points.y);
	      }
	      screen.closePath();
	      screen.strokeStyle = "blue";
	      screen.stroke();
	    }
	  }, {
	    key: "width",
	    get: function get() {}
	  }, {
	    key: "height",
	    get: function get() {}
	  }, {
	    key: "globalX",
	    get: function get() {}
	  }, {
	    key: "globalY",
	    get: function get() {}
	  }, {
	    key: "globalAngle",
	    get: function get() {}
	  }, {
	    key: "drawParent",
	    get: function get() {}
	  }, {
	    key: "pivotX",
	    get: function get() {
	      return this.width / 2;
	    }
	  }, {
	    key: "pivotY",
	    get: function get() {
	      return this.height / 2;
	    }
	  }, {
	    key: "collisionPoly",
	    get: function get() {
	      return (0, _Utils.boundingBox)(this);
	    }
	  }]);
	
	  return Sprite;
	}();
	
	exports.default = Sprite;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.boundingBox = boundingBox;
	exports.isSpritesColliding = isSpritesColliding;
	exports.isPointInSprite = isPointInSprite;
	
	var _sat = __webpack_require__(9);
	
	var _sat2 = _interopRequireDefault(_sat);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Response = _sat2.default.Response;
	var V = _sat2.default.Vector;
	var B = _sat2.default.Box;
	
	function boundingBox(sprite) {
	
	  if (sprite.width === undefined) throw "No width: " + sprite.constructor.name;
	  if (sprite.height === undefined) throw "No height!" + sprite.constructor.name;
	  if (sprite.pivotX === undefined) throw "No pivotX!" + sprite.constructor.name;
	  if (sprite.pivotY === undefined) throw "No pivotY!" + sprite.constructor.name;
	  if (sprite.globalAngle === undefined) throw "No global angle!" + sprite.constructor.name;
	  if (sprite.globalX === undefined) throw "No globalX!" + sprite.constructor.name;
	  if (sprite.globalY === undefined) throw "No globalY!" + sprite.constructor.name;
	
	  var bbox = new B(new V(0, 0), sprite.width, sprite.height).toPolygon();
	
	  bbox.translate(-sprite.pivotX, -sprite.pivotY);
	  bbox.rotate(sprite.globalAngle + Math.PI / 2);
	  bbox.translate(sprite.globalX, sprite.globalY);
	
	  return bbox;
	}
	
	function isSpritesColliding(s1, s2) {
	  if (s1 === s2) return false;
	  var isColliding = _sat2.default.testPolygonPolygon(s1.collisionPoly, s2.collisionPoly);
	  return isColliding;
	}
	
	function isPointInSprite(x, y, sprite) {
	  var bb = boundingBox(sprite);
	  var point = new V(x, y);
	
	  return _sat2.default.pointInPolygon(point, bb);
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {// Version 0.5.0 - Copyright 2012 - 2015 -  Jim Riecken <jimr@jimr.ca>
	//
	// Released under the MIT License - https://github.com/jriecken/sat-js
	//
	// A simple library for determining intersections of circles and
	// polygons using the Separating Axis Theorem.
	/** @preserve SAT.js - Version 0.5.0 - Copyright 2012 - 2015 - Jim Riecken <jimr@jimr.ca> - released under the MIT License. https://github.com/jriecken/sat-js */
	
	/*global define: false, module: false*/
	/*jshint shadow:true, sub:true, forin:true, noarg:true, noempty:true, 
	  eqeqeq:true, bitwise:true, strict:true, undef:true, 
	  curly:true, browser:true */
	
	// Create a UMD wrapper for SAT. Works in:
	//
	//  - Plain browser via global SAT variable
	//  - AMD loader (like require.js)
	//  - Node.js
	//
	// The quoted properties all over the place are used so that the Closure Compiler
	// does not mangle the exposed API in advanced mode.
	/**
	 * @param {*} root - The global scope
	 * @param {Function} factory - Factory that creates SAT module
	 */
	(function (root, factory) {
	  "use strict";
	  if ("function" === 'function' && __webpack_require__(11)['amd']) {
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (true) {
	    module['exports'] = factory();
	  } else {
	    root['SAT'] = factory();
	  }
	}(this, function () {
	  "use strict";
	
	  var SAT = {};
	
	  //
	  // ## Vector
	  //
	  // Represents a vector in two dimensions with `x` and `y` properties.
	
	
	  // Create a new Vector, optionally passing in the `x` and `y` coordinates. If
	  // a coordinate is not specified, it will be set to `0`
	  /** 
	   * @param {?number=} x The x position.
	   * @param {?number=} y The y position.
	   * @constructor
	   */
	  function Vector(x, y) {
	    this['x'] = x || 0;
	    this['y'] = y || 0;
	  }
	  SAT['Vector'] = Vector;
	  // Alias `Vector` as `V`
	  SAT['V'] = Vector;
	
	
	  // Copy the values of another Vector into this one.
	  /**
	   * @param {Vector} other The other Vector.
	   * @return {Vector} This for chaining.
	   */
	  Vector.prototype['copy'] = Vector.prototype.copy = function(other) {
	    this['x'] = other['x'];
	    this['y'] = other['y'];
	    return this;
	  };
	
	  // Create a new vector with the same coordinates as this on.
	  /**
	   * @return {Vector} The new cloned vector
	   */
	  Vector.prototype['clone'] = Vector.prototype.clone = function() {
	    return new Vector(this['x'], this['y']);
	  };
	
	  // Change this vector to be perpendicular to what it was before. (Effectively
	  // roatates it 90 degrees in a clockwise direction)
	  /**
	   * @return {Vector} This for chaining.
	   */
	  Vector.prototype['perp'] = Vector.prototype.perp = function() {
	    var x = this['x'];
	    this['x'] = this['y'];
	    this['y'] = -x;
	    return this;
	  };
	
	  // Rotate this vector (counter-clockwise) by the specified angle (in radians).
	  /**
	   * @param {number} angle The angle to rotate (in radians)
	   * @return {Vector} This for chaining.
	   */
	  Vector.prototype['rotate'] = Vector.prototype.rotate = function (angle) {
	    var x = this['x'];
	    var y = this['y'];
	    this['x'] = x * Math.cos(angle) - y * Math.sin(angle);
	    this['y'] = x * Math.sin(angle) + y * Math.cos(angle);
	    return this;
	  };
	
	  // Reverse this vector.
	  /**
	   * @return {Vector} This for chaining.
	   */
	  Vector.prototype['reverse'] = Vector.prototype.reverse = function() {
	    this['x'] = -this['x'];
	    this['y'] = -this['y'];
	    return this;
	  };
	  
	
	  // Normalize this vector.  (make it have length of `1`)
	  /**
	   * @return {Vector} This for chaining.
	   */
	  Vector.prototype['normalize'] = Vector.prototype.normalize = function() {
	    var d = this.len();
	    if(d > 0) {
	      this['x'] = this['x'] / d;
	      this['y'] = this['y'] / d;
	    }
	    return this;
	  };
	  
	  // Add another vector to this one.
	  /**
	   * @param {Vector} other The other Vector.
	   * @return {Vector} This for chaining.
	   */
	  Vector.prototype['add'] = Vector.prototype.add = function(other) {
	    this['x'] += other['x'];
	    this['y'] += other['y'];
	    return this;
	  };
	  
	  // Subtract another vector from this one.
	  /**
	   * @param {Vector} other The other Vector.
	   * @return {Vector} This for chaiing.
	   */
	  Vector.prototype['sub'] = Vector.prototype.sub = function(other) {
	    this['x'] -= other['x'];
	    this['y'] -= other['y'];
	    return this;
	  };
	  
	  // Scale this vector. An independant scaling factor can be provided
	  // for each axis, or a single scaling factor that will scale both `x` and `y`.
	  /**
	   * @param {number} x The scaling factor in the x direction.
	   * @param {?number=} y The scaling factor in the y direction.  If this
	   *   is not specified, the x scaling factor will be used.
	   * @return {Vector} This for chaining.
	   */
	  Vector.prototype['scale'] = Vector.prototype.scale = function(x,y) {
	    this['x'] *= x;
	    this['y'] *= y || x;
	    return this; 
	  };
	  
	  // Project this vector on to another vector.
	  /**
	   * @param {Vector} other The vector to project onto.
	   * @return {Vector} This for chaining.
	   */
	  Vector.prototype['project'] = Vector.prototype.project = function(other) {
	    var amt = this.dot(other) / other.len2();
	    this['x'] = amt * other['x'];
	    this['y'] = amt * other['y'];
	    return this;
	  };
	  
	  // Project this vector onto a vector of unit length. This is slightly more efficient
	  // than `project` when dealing with unit vectors.
	  /**
	   * @param {Vector} other The unit vector to project onto.
	   * @return {Vector} This for chaining.
	   */
	  Vector.prototype['projectN'] = Vector.prototype.projectN = function(other) {
	    var amt = this.dot(other);
	    this['x'] = amt * other['x'];
	    this['y'] = amt * other['y'];
	    return this;
	  };
	  
	  // Reflect this vector on an arbitrary axis.
	  /**
	   * @param {Vector} axis The vector representing the axis.
	   * @return {Vector} This for chaining.
	   */
	  Vector.prototype['reflect'] = Vector.prototype.reflect = function(axis) {
	    var x = this['x'];
	    var y = this['y'];
	    this.project(axis).scale(2);
	    this['x'] -= x;
	    this['y'] -= y;
	    return this;
	  };
	  
	  // Reflect this vector on an arbitrary axis (represented by a unit vector). This is
	  // slightly more efficient than `reflect` when dealing with an axis that is a unit vector.
	  /**
	   * @param {Vector} axis The unit vector representing the axis.
	   * @return {Vector} This for chaining.
	   */
	  Vector.prototype['reflectN'] = Vector.prototype.reflectN = function(axis) {
	    var x = this['x'];
	    var y = this['y'];
	    this.projectN(axis).scale(2);
	    this['x'] -= x;
	    this['y'] -= y;
	    return this;
	  };
	  
	  // Get the dot product of this vector and another.
	  /**
	   * @param {Vector}  other The vector to dot this one against.
	   * @return {number} The dot product.
	   */
	  Vector.prototype['dot'] = Vector.prototype.dot = function(other) {
	    return this['x'] * other['x'] + this['y'] * other['y'];
	  };
	  
	  // Get the squared length of this vector.
	  /**
	   * @return {number} The length^2 of this vector.
	   */
	  Vector.prototype['len2'] = Vector.prototype.len2 = function() {
	    return this.dot(this);
	  };
	  
	  // Get the length of this vector.
	  /**
	   * @return {number} The length of this vector.
	   */
	  Vector.prototype['len'] = Vector.prototype.len = function() {
	    return Math.sqrt(this.len2());
	  };
	  
	  // ## Circle
	  //
	  // Represents a circle with a position and a radius.
	
	  // Create a new circle, optionally passing in a position and/or radius. If no position
	  // is given, the circle will be at `(0,0)`. If no radius is provided, the circle will
	  // have a radius of `0`.
	  /**
	   * @param {Vector=} pos A vector representing the position of the center of the circle
	   * @param {?number=} r The radius of the circle
	   * @constructor
	   */
	  function Circle(pos, r) {
	    this['pos'] = pos || new Vector();
	    this['r'] = r || 0;
	  }
	  SAT['Circle'] = Circle;
	  
	  // Compute the axis-aligned bounding box (AABB) of this Circle.
	  //
	  // Note: Returns a _new_ `Polygon` each time you call this.
	  /**
	   * @return {Polygon} The AABB
	   */
	  Circle.prototype['getAABB'] = Circle.prototype.getAABB = function() {
	    var r = this['r'];
	    var corner = this["pos"].clone().sub(new Vector(r, r));
	    return new Box(corner, r*2, r*2).toPolygon();
	  };
	
	  // ## Polygon
	  //
	  // Represents a *convex* polygon with any number of points (specified in counter-clockwise order)
	  //
	  // Note: Do _not_ manually change the `points`, `angle`, or `offset` properties. Use the
	  // provided setters. Otherwise the calculated properties will not be updated correctly.
	  //
	  // `pos` can be changed directly.
	
	  // Create a new polygon, passing in a position vector, and an array of points (represented
	  // by vectors relative to the position vector). If no position is passed in, the position
	  // of the polygon will be `(0,0)`.
	  /**
	   * @param {Vector=} pos A vector representing the origin of the polygon. (all other
	   *   points are relative to this one)
	   * @param {Array.<Vector>=} points An array of vectors representing the points in the polygon,
	   *   in counter-clockwise order.
	   * @constructor
	   */
	  function Polygon(pos, points) {
	    this['pos'] = pos || new Vector();
	    this['angle'] = 0;
	    this['offset'] = new Vector();
	    this.setPoints(points || []);
	  }
	  SAT['Polygon'] = Polygon;
	  
	  // Set the points of the polygon.
	  /**
	   * @param {Array.<Vector>=} points An array of vectors representing the points in the polygon,
	   *   in counter-clockwise order.
	   * @return {Polygon} This for chaining.
	   */
	  Polygon.prototype['setPoints'] = Polygon.prototype.setPoints = function(points) {
	    // Only re-allocate if this is a new polygon or the number of points has changed.
	    var lengthChanged = !this['points'] || this['points'].length !== points.length;
	    if (lengthChanged) {
	      var i;
	      var calcPoints = this['calcPoints'] = [];
	      var edges = this['edges'] = [];
	      var normals = this['normals'] = [];
	      // Allocate the vector arrays for the calculated properties
	      for (i = 0; i < points.length; i++) {
	        calcPoints.push(new Vector());
	        edges.push(new Vector());
	        normals.push(new Vector());
	      }
	    }
	    this['points'] = points;
	    this._recalc();
	    return this;
	  };
	
	  // Set the current rotation angle of the polygon.
	  /**
	   * @param {number} angle The current rotation angle (in radians).
	   * @return {Polygon} This for chaining.
	   */
	  Polygon.prototype['setAngle'] = Polygon.prototype.setAngle = function(angle) {
	    this['angle'] = angle;
	    this._recalc();
	    return this;
	  };
	
	  // Set the current offset to apply to the `points` before applying the `angle` rotation.
	  /**
	   * @param {Vector} offset The new offset vector.
	   * @return {Polygon} This for chaining.
	   */
	  Polygon.prototype['setOffset'] = Polygon.prototype.setOffset = function(offset) {
	    this['offset'] = offset;
	    this._recalc();
	    return this;
	  };
	
	  // Rotates this polygon counter-clockwise around the origin of *its local coordinate system* (i.e. `pos`).
	  //
	  // Note: This changes the **original** points (so any `angle` will be applied on top of this rotation).
	  /**
	   * @param {number} angle The angle to rotate (in radians)
	   * @return {Polygon} This for chaining.
	   */
	  Polygon.prototype['rotate'] = Polygon.prototype.rotate = function(angle) {
	    var points = this['points'];
	    var len = points.length;
	    for (var i = 0; i < len; i++) {
	      points[i].rotate(angle);
	    }
	    this._recalc();
	    return this;
	  };
	
	  // Translates the points of this polygon by a specified amount relative to the origin of *its own coordinate
	  // system* (i.e. `pos`).
	  //
	  // This is most useful to change the "center point" of a polygon. If you just want to move the whole polygon, change
	  // the coordinates of `pos`.
	  //
	  // Note: This changes the **original** points (so any `offset` will be applied on top of this translation)
	  /**
	   * @param {number} x The horizontal amount to translate.
	   * @param {number} y The vertical amount to translate.
	   * @return {Polygon} This for chaining.
	   */
	  Polygon.prototype['translate'] = Polygon.prototype.translate = function (x, y) {
	    var points = this['points'];
	    var len = points.length;
	    for (var i = 0; i < len; i++) {
	      points[i].x += x;
	      points[i].y += y;
	    }
	    this._recalc();
	    return this;
	  };
	
	
	  // Computes the calculated collision polygon. Applies the `angle` and `offset` to the original points then recalculates the
	  // edges and normals of the collision polygon.
	  /**
	   * @return {Polygon} This for chaining.
	   */
	  Polygon.prototype._recalc = function() {
	    // Calculated points - this is what is used for underlying collisions and takes into account
	    // the angle/offset set on the polygon.
	    var calcPoints = this['calcPoints'];
	    // The edges here are the direction of the `n`th edge of the polygon, relative to
	    // the `n`th point. If you want to draw a given edge from the edge value, you must
	    // first translate to the position of the starting point.
	    var edges = this['edges'];
	    // The normals here are the direction of the normal for the `n`th edge of the polygon, relative
	    // to the position of the `n`th point. If you want to draw an edge normal, you must first
	    // translate to the position of the starting point.
	    var normals = this['normals'];
	    // Copy the original points array and apply the offset/angle
	    var points = this['points'];
	    var offset = this['offset'];
	    var angle = this['angle'];
	    var len = points.length;
	    var i;
	    for (i = 0; i < len; i++) {
	      var calcPoint = calcPoints[i].copy(points[i]);
	      calcPoint.x += offset.x;
	      calcPoint.y += offset.y;
	      if (angle !== 0) {
	        calcPoint.rotate(angle);
	      }
	    }
	    // Calculate the edges/normals
	    for (i = 0; i < len; i++) {
	      var p1 = calcPoints[i];
	      var p2 = i < len - 1 ? calcPoints[i + 1] : calcPoints[0];
	      var e = edges[i].copy(p2).sub(p1);
	      normals[i].copy(e).perp().normalize();
	    }
	    return this;
	  };
	  
	  
	  // Compute the axis-aligned bounding box. Any current state
	  // (translations/rotations) will be applied before constructing the AABB.
	  //
	  // Note: Returns a _new_ `Polygon` each time you call this.
	  /**
	   * @return {Polygon} The AABB
	   */
	  Polygon.prototype["getAABB"] = Polygon.prototype.getAABB = function() {
	    var points = this["calcPoints"];
	    var len = points.length;
	    var xMin = points[0]["x"];
	    var yMin = points[0]["y"];
	    var xMax = points[0]["x"];
	    var yMax = points[0]["y"];
	    for (var i = 1; i < len; i++) {
	      var point = points[i];
	      if (point["x"] < xMin) {
	        xMin = point["x"];
	      }
	      else if (point["x"] > xMax) {
	        xMax = point["x"];
	      }
	      if (point["y"] < yMin) {
	        yMin = point["y"];
	      }
	      else if (point["y"] > yMax) {
	        yMax = point["y"];
	      }
	    }
	    return new Box(this["pos"].clone().add(new Vector(xMin, yMin)), xMax - xMin, yMax - yMin).toPolygon();
	  };
	  
	
	  // ## Box
	  //
	  // Represents an axis-aligned box, with a width and height.
	
	
	  // Create a new box, with the specified position, width, and height. If no position
	  // is given, the position will be `(0,0)`. If no width or height are given, they will
	  // be set to `0`.
	  /**
	   * @param {Vector=} pos A vector representing the top-left of the box.
	   * @param {?number=} w The width of the box.
	   * @param {?number=} h The height of the box.
	   * @constructor
	   */
	  function Box(pos, w, h) {
	    this['pos'] = pos || new Vector();
	    this['w'] = w || 0;
	    this['h'] = h || 0;
	  }
	  SAT['Box'] = Box;
	
	  // Returns a polygon whose edges are the same as this box.
	  /**
	   * @return {Polygon} A new Polygon that represents this box.
	   */
	  Box.prototype['toPolygon'] = Box.prototype.toPolygon = function() {
	    var pos = this['pos'];
	    var w = this['w'];
	    var h = this['h'];
	    return new Polygon(new Vector(pos['x'], pos['y']), [
	     new Vector(), new Vector(w, 0), 
	     new Vector(w,h), new Vector(0,h)
	    ]);
	  };
	  
	  // ## Response
	  //
	  // An object representing the result of an intersection. Contains:
	  //  - The two objects participating in the intersection
	  //  - The vector representing the minimum change necessary to extract the first object
	  //    from the second one (as well as a unit vector in that direction and the magnitude
	  //    of the overlap)
	  //  - Whether the first object is entirely inside the second, and vice versa.
	  /**
	   * @constructor
	   */  
	  function Response() {
	    this['a'] = null;
	    this['b'] = null;
	    this['overlapN'] = new Vector();
	    this['overlapV'] = new Vector();
	    this.clear();
	  }
	  SAT['Response'] = Response;
	
	  // Set some values of the response back to their defaults.  Call this between tests if
	  // you are going to reuse a single Response object for multiple intersection tests (recommented
	  // as it will avoid allcating extra memory)
	  /**
	   * @return {Response} This for chaining
	   */
	  Response.prototype['clear'] = Response.prototype.clear = function() {
	    this['aInB'] = true;
	    this['bInA'] = true;
	    this['overlap'] = Number.MAX_VALUE;
	    return this;
	  };
	
	  // ## Object Pools
	
	  // A pool of `Vector` objects that are used in calculations to avoid
	  // allocating memory.
	  /**
	   * @type {Array.<Vector>}
	   */
	  var T_VECTORS = [];
	  for (var i = 0; i < 10; i++) { T_VECTORS.push(new Vector()); }
	  
	  // A pool of arrays of numbers used in calculations to avoid allocating
	  // memory.
	  /**
	   * @type {Array.<Array.<number>>}
	   */
	  var T_ARRAYS = [];
	  for (var i = 0; i < 5; i++) { T_ARRAYS.push([]); }
	
	  // Temporary response used for polygon hit detection.
	  /**
	   * @type {Response}
	   */
	  var T_RESPONSE = new Response();
	
	  // Unit square polygon used for polygon hit detection.
	  /**
	   * @type {Polygon}
	   */
	  var UNIT_SQUARE = new Box(new Vector(), 1, 1).toPolygon();
	
	  // ## Helper Functions
	
	  // Flattens the specified array of points onto a unit vector axis,
	  // resulting in a one dimensional range of the minimum and
	  // maximum value on that axis.
	  /**
	   * @param {Array.<Vector>} points The points to flatten.
	   * @param {Vector} normal The unit vector axis to flatten on.
	   * @param {Array.<number>} result An array.  After calling this function,
	   *   result[0] will be the minimum value,
	   *   result[1] will be the maximum value.
	   */
	  function flattenPointsOn(points, normal, result) {
	    var min = Number.MAX_VALUE;
	    var max = -Number.MAX_VALUE;
	    var len = points.length;
	    for (var i = 0; i < len; i++ ) {
	      // The magnitude of the projection of the point onto the normal
	      var dot = points[i].dot(normal);
	      if (dot < min) { min = dot; }
	      if (dot > max) { max = dot; }
	    }
	    result[0] = min; result[1] = max;
	  }
	  
	  // Check whether two convex polygons are separated by the specified
	  // axis (must be a unit vector).
	  /**
	   * @param {Vector} aPos The position of the first polygon.
	   * @param {Vector} bPos The position of the second polygon.
	   * @param {Array.<Vector>} aPoints The points in the first polygon.
	   * @param {Array.<Vector>} bPoints The points in the second polygon.
	   * @param {Vector} axis The axis (unit sized) to test against.  The points of both polygons
	   *   will be projected onto this axis.
	   * @param {Response=} response A Response object (optional) which will be populated
	   *   if the axis is not a separating axis.
	   * @return {boolean} true if it is a separating axis, false otherwise.  If false,
	   *   and a response is passed in, information about how much overlap and
	   *   the direction of the overlap will be populated.
	   */
	  function isSeparatingAxis(aPos, bPos, aPoints, bPoints, axis, response) {
	    var rangeA = T_ARRAYS.pop();
	    var rangeB = T_ARRAYS.pop();
	    // The magnitude of the offset between the two polygons
	    var offsetV = T_VECTORS.pop().copy(bPos).sub(aPos);
	    var projectedOffset = offsetV.dot(axis);
	    // Project the polygons onto the axis.
	    flattenPointsOn(aPoints, axis, rangeA);
	    flattenPointsOn(bPoints, axis, rangeB);
	    // Move B's range to its position relative to A.
	    rangeB[0] += projectedOffset;
	    rangeB[1] += projectedOffset;
	    // Check if there is a gap. If there is, this is a separating axis and we can stop
	    if (rangeA[0] > rangeB[1] || rangeB[0] > rangeA[1]) {
	      T_VECTORS.push(offsetV); 
	      T_ARRAYS.push(rangeA); 
	      T_ARRAYS.push(rangeB);
	      return true;
	    }
	    // This is not a separating axis. If we're calculating a response, calculate the overlap.
	    if (response) {
	      var overlap = 0;
	      // A starts further left than B
	      if (rangeA[0] < rangeB[0]) {
	        response['aInB'] = false;
	        // A ends before B does. We have to pull A out of B
	        if (rangeA[1] < rangeB[1]) { 
	          overlap = rangeA[1] - rangeB[0];
	          response['bInA'] = false;
	        // B is fully inside A.  Pick the shortest way out.
	        } else {
	          var option1 = rangeA[1] - rangeB[0];
	          var option2 = rangeB[1] - rangeA[0];
	          overlap = option1 < option2 ? option1 : -option2;
	        }
	      // B starts further left than A
	      } else {
	        response['bInA'] = false;
	        // B ends before A ends. We have to push A out of B
	        if (rangeA[1] > rangeB[1]) { 
	          overlap = rangeA[0] - rangeB[1];
	          response['aInB'] = false;
	        // A is fully inside B.  Pick the shortest way out.
	        } else {
	          var option1 = rangeA[1] - rangeB[0];
	          var option2 = rangeB[1] - rangeA[0];
	          overlap = option1 < option2 ? option1 : -option2;
	        }
	      }
	      // If this is the smallest amount of overlap we've seen so far, set it as the minimum overlap.
	      var absOverlap = Math.abs(overlap);
	      if (absOverlap < response['overlap']) {
	        response['overlap'] = absOverlap;
	        response['overlapN'].copy(axis);
	        if (overlap < 0) {
	          response['overlapN'].reverse();
	        }
	      }      
	    }
	    T_VECTORS.push(offsetV); 
	    T_ARRAYS.push(rangeA); 
	    T_ARRAYS.push(rangeB);
	    return false;
	  }
	  
	  // Calculates which Vornoi region a point is on a line segment.
	  // It is assumed that both the line and the point are relative to `(0,0)`
	  //
	  //            |       (0)      |
	  //     (-1)  [S]--------------[E]  (1)
	  //            |       (0)      |
	  /**
	   * @param {Vector} line The line segment.
	   * @param {Vector} point The point.
	   * @return  {number} LEFT_VORNOI_REGION (-1) if it is the left region, 
	   *          MIDDLE_VORNOI_REGION (0) if it is the middle region, 
	   *          RIGHT_VORNOI_REGION (1) if it is the right region.
	   */
	  function vornoiRegion(line, point) {
	    var len2 = line.len2();
	    var dp = point.dot(line);
	    // If the point is beyond the start of the line, it is in the
	    // left vornoi region.
	    if (dp < 0) { return LEFT_VORNOI_REGION; }
	    // If the point is beyond the end of the line, it is in the
	    // right vornoi region.
	    else if (dp > len2) { return RIGHT_VORNOI_REGION; }
	    // Otherwise, it's in the middle one.
	    else { return MIDDLE_VORNOI_REGION; }
	  }
	  // Constants for Vornoi regions
	  /**
	   * @const
	   */
	  var LEFT_VORNOI_REGION = -1;
	  /**
	   * @const
	   */
	  var MIDDLE_VORNOI_REGION = 0;
	  /**
	   * @const
	   */
	  var RIGHT_VORNOI_REGION = 1;
	  
	  // ## Collision Tests
	
	  // Check if a point is inside a circle.
	  /**
	   * @param {Vector} p The point to test.
	   * @param {Circle} c The circle to test.
	   * @return {boolean} true if the point is inside the circle, false if it is not.
	   */
	  function pointInCircle(p, c) {
	    var differenceV = T_VECTORS.pop().copy(p).sub(c['pos']);
	    var radiusSq = c['r'] * c['r'];
	    var distanceSq = differenceV.len2();
	    T_VECTORS.push(differenceV);
	    // If the distance between is smaller than the radius then the point is inside the circle.
	    return distanceSq <= radiusSq;
	  }
	  SAT['pointInCircle'] = pointInCircle;
	
	  // Check if a point is inside a convex polygon.
	  /**
	   * @param {Vector} p The point to test.
	   * @param {Polygon} poly The polygon to test.
	   * @return {boolean} true if the point is inside the polygon, false if it is not.
	   */
	  function pointInPolygon(p, poly) {
	    UNIT_SQUARE['pos'].copy(p);
	    T_RESPONSE.clear();
	    var result = testPolygonPolygon(UNIT_SQUARE, poly, T_RESPONSE);
	    if (result) {
	      result = T_RESPONSE['aInB'];
	    }
	    return result;
	  }
	  SAT['pointInPolygon'] = pointInPolygon;
	
	  // Check if two circles collide.
	  /**
	   * @param {Circle} a The first circle.
	   * @param {Circle} b The second circle.
	   * @param {Response=} response Response object (optional) that will be populated if
	   *   the circles intersect.
	   * @return {boolean} true if the circles intersect, false if they don't. 
	   */
	  function testCircleCircle(a, b, response) {
	    // Check if the distance between the centers of the two
	    // circles is greater than their combined radius.
	    var differenceV = T_VECTORS.pop().copy(b['pos']).sub(a['pos']);
	    var totalRadius = a['r'] + b['r'];
	    var totalRadiusSq = totalRadius * totalRadius;
	    var distanceSq = differenceV.len2();
	    // If the distance is bigger than the combined radius, they don't intersect.
	    if (distanceSq > totalRadiusSq) {
	      T_VECTORS.push(differenceV);
	      return false;
	    }
	    // They intersect.  If we're calculating a response, calculate the overlap.
	    if (response) { 
	      var dist = Math.sqrt(distanceSq);
	      response['a'] = a;
	      response['b'] = b;
	      response['overlap'] = totalRadius - dist;
	      response['overlapN'].copy(differenceV.normalize());
	      response['overlapV'].copy(differenceV).scale(response['overlap']);
	      response['aInB']= a['r'] <= b['r'] && dist <= b['r'] - a['r'];
	      response['bInA'] = b['r'] <= a['r'] && dist <= a['r'] - b['r'];
	    }
	    T_VECTORS.push(differenceV);
	    return true;
	  }
	  SAT['testCircleCircle'] = testCircleCircle;
	  
	  // Check if a polygon and a circle collide.
	  /**
	   * @param {Polygon} polygon The polygon.
	   * @param {Circle} circle The circle.
	   * @param {Response=} response Response object (optional) that will be populated if
	   *   they interset.
	   * @return {boolean} true if they intersect, false if they don't.
	   */
	  function testPolygonCircle(polygon, circle, response) {
	    // Get the position of the circle relative to the polygon.
	    var circlePos = T_VECTORS.pop().copy(circle['pos']).sub(polygon['pos']);
	    var radius = circle['r'];
	    var radius2 = radius * radius;
	    var points = polygon['calcPoints'];
	    var len = points.length;
	    var edge = T_VECTORS.pop();
	    var point = T_VECTORS.pop();
	    
	    // For each edge in the polygon:
	    for (var i = 0; i < len; i++) {
	      var next = i === len - 1 ? 0 : i + 1;
	      var prev = i === 0 ? len - 1 : i - 1;
	      var overlap = 0;
	      var overlapN = null;
	      
	      // Get the edge.
	      edge.copy(polygon['edges'][i]);
	      // Calculate the center of the circle relative to the starting point of the edge.
	      point.copy(circlePos).sub(points[i]);
	      
	      // If the distance between the center of the circle and the point
	      // is bigger than the radius, the polygon is definitely not fully in
	      // the circle.
	      if (response && point.len2() > radius2) {
	        response['aInB'] = false;
	      }
	      
	      // Calculate which Vornoi region the center of the circle is in.
	      var region = vornoiRegion(edge, point);
	      // If it's the left region:
	      if (region === LEFT_VORNOI_REGION) { 
	        // We need to make sure we're in the RIGHT_VORNOI_REGION of the previous edge.
	        edge.copy(polygon['edges'][prev]);
	        // Calculate the center of the circle relative the starting point of the previous edge
	        var point2 = T_VECTORS.pop().copy(circlePos).sub(points[prev]);
	        region = vornoiRegion(edge, point2);
	        if (region === RIGHT_VORNOI_REGION) {
	          // It's in the region we want.  Check if the circle intersects the point.
	          var dist = point.len();
	          if (dist > radius) {
	            // No intersection
	            T_VECTORS.push(circlePos); 
	            T_VECTORS.push(edge);
	            T_VECTORS.push(point); 
	            T_VECTORS.push(point2);
	            return false;
	          } else if (response) {
	            // It intersects, calculate the overlap.
	            response['bInA'] = false;
	            overlapN = point.normalize();
	            overlap = radius - dist;
	          }
	        }
	        T_VECTORS.push(point2);
	      // If it's the right region:
	      } else if (region === RIGHT_VORNOI_REGION) {
	        // We need to make sure we're in the left region on the next edge
	        edge.copy(polygon['edges'][next]);
	        // Calculate the center of the circle relative to the starting point of the next edge.
	        point.copy(circlePos).sub(points[next]);
	        region = vornoiRegion(edge, point);
	        if (region === LEFT_VORNOI_REGION) {
	          // It's in the region we want.  Check if the circle intersects the point.
	          var dist = point.len();
	          if (dist > radius) {
	            // No intersection
	            T_VECTORS.push(circlePos); 
	            T_VECTORS.push(edge); 
	            T_VECTORS.push(point);
	            return false;              
	          } else if (response) {
	            // It intersects, calculate the overlap.
	            response['bInA'] = false;
	            overlapN = point.normalize();
	            overlap = radius - dist;
	          }
	        }
	      // Otherwise, it's the middle region:
	      } else {
	        // Need to check if the circle is intersecting the edge,
	        // Change the edge into its "edge normal".
	        var normal = edge.perp().normalize();
	        // Find the perpendicular distance between the center of the 
	        // circle and the edge.
	        var dist = point.dot(normal);
	        var distAbs = Math.abs(dist);
	        // If the circle is on the outside of the edge, there is no intersection.
	        if (dist > 0 && distAbs > radius) {
	          // No intersection
	          T_VECTORS.push(circlePos); 
	          T_VECTORS.push(normal); 
	          T_VECTORS.push(point);
	          return false;
	        } else if (response) {
	          // It intersects, calculate the overlap.
	          overlapN = normal;
	          overlap = radius - dist;
	          // If the center of the circle is on the outside of the edge, or part of the
	          // circle is on the outside, the circle is not fully inside the polygon.
	          if (dist >= 0 || overlap < 2 * radius) {
	            response['bInA'] = false;
	          }
	        }
	      }
	      
	      // If this is the smallest overlap we've seen, keep it. 
	      // (overlapN may be null if the circle was in the wrong Vornoi region).
	      if (overlapN && response && Math.abs(overlap) < Math.abs(response['overlap'])) {
	        response['overlap'] = overlap;
	        response['overlapN'].copy(overlapN);
	      }
	    }
	    
	    // Calculate the final overlap vector - based on the smallest overlap.
	    if (response) {
	      response['a'] = polygon;
	      response['b'] = circle;
	      response['overlapV'].copy(response['overlapN']).scale(response['overlap']);
	    }
	    T_VECTORS.push(circlePos); 
	    T_VECTORS.push(edge); 
	    T_VECTORS.push(point);
	    return true;
	  }
	  SAT['testPolygonCircle'] = testPolygonCircle;
	  
	  // Check if a circle and a polygon collide.
	  //
	  // **NOTE:** This is slightly less efficient than polygonCircle as it just
	  // runs polygonCircle and reverses everything at the end.
	  /**
	   * @param {Circle} circle The circle.
	   * @param {Polygon} polygon The polygon.
	   * @param {Response=} response Response object (optional) that will be populated if
	   *   they interset.
	   * @return {boolean} true if they intersect, false if they don't.
	   */
	  function testCirclePolygon(circle, polygon, response) {
	    // Test the polygon against the circle.
	    var result = testPolygonCircle(polygon, circle, response);
	    if (result && response) {
	      // Swap A and B in the response.
	      var a = response['a'];
	      var aInB = response['aInB'];
	      response['overlapN'].reverse();
	      response['overlapV'].reverse();
	      response['a'] = response['b'];
	      response['b'] = a;
	      response['aInB'] = response['bInA'];
	      response['bInA'] = aInB;
	    }
	    return result;
	  }
	  SAT['testCirclePolygon'] = testCirclePolygon;
	  
	  // Checks whether polygons collide.
	  /**
	   * @param {Polygon} a The first polygon.
	   * @param {Polygon} b The second polygon.
	   * @param {Response=} response Response object (optional) that will be populated if
	   *   they interset.
	   * @return {boolean} true if they intersect, false if they don't.
	   */
	  function testPolygonPolygon(a, b, response) {
	    var aPoints = a['calcPoints'];
	    var aLen = aPoints.length;
	    var bPoints = b['calcPoints'];
	    var bLen = bPoints.length;
	    // If any of the edge normals of A is a separating axis, no intersection.
	    for (var i = 0; i < aLen; i++) {
	      if (isSeparatingAxis(a['pos'], b['pos'], aPoints, bPoints, a['normals'][i], response)) {
	        return false;
	      }
	    }
	    // If any of the edge normals of B is a separating axis, no intersection.
	    for (var i = 0;i < bLen; i++) {
	      if (isSeparatingAxis(a['pos'], b['pos'], aPoints, bPoints, b['normals'][i], response)) {
	        return false;
	      }
	    }
	    // Since none of the edge normals of A or B are a separating axis, there is an intersection
	    // and we've already calculated the smallest overlap (in isSeparatingAxis).  Calculate the
	    // final overlap vector.
	    if (response) {
	      response['a'] = a;
	      response['b'] = b;
	      response['overlapV'].copy(response['overlapN']).scale(response['overlap']);
	    }
	    return true;
	  }
	  SAT['testPolygonPolygon'] = testPolygonPolygon;
	
	  return SAT;
	}));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10)(module)))

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ShipModule2 = __webpack_require__(13);
	
	var _ShipModule3 = _interopRequireDefault(_ShipModule2);
	
	var _Constants = __webpack_require__(14);
	
	var _ImageLoader = __webpack_require__(15);
	
	var _engine = __webpack_require__(16);
	
	var _engine2 = _interopRequireDefault(_engine);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MASS = 5;
	var ENGINE_POWER = 25;
	var TURN_POWER = 5;
	var COST = 50;
	var HITPOINTS = 5;
	var POWER_GENERATION = 0;
	
	var Engine = function (_ShipModule) {
	  _inherits(Engine, _ShipModule);
	
	  function Engine(ship, x, y) {
	    _classCallCheck(this, Engine);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Engine).call(this, ship, x, y, MASS, ENGINE_POWER, TURN_POWER, COST, HITPOINTS, POWER_GENERATION, _Constants.BLOCK_SIZE, _Constants.BLOCK_SIZE));
	
	    _this.img = (0, _ImageLoader.loadImage)(_engine2.default, ship.color);
	    return _this;
	  }
	
	  _createClass(Engine, [{
	    key: "draw",
	    value: function draw(screen) {
	      screen.save();
	      screen.translate(this.x, this.y);
	
	      if (this.ship.accelerating) {
	        screen.fillStyle = this.ship.color;
	        screen.beginPath();
	        screen.lineTo(0, 0);
	        screen.lineTo(_Constants.BLOCK_SIZE, 0);
	        screen.lineTo(_Constants.BLOCK_SIZE / 2, _Constants.BLOCK_SIZE);
	        screen.closePath();
	        screen.fill();
	      }
	
	      screen.drawImage(this.img, 0, 0, this.width, this.height);
	
	      screen.restore();
	    }
	  }]);
	
	  return Engine;
	}(_ShipModule3.default);
	
	exports.default = Engine;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _sat = __webpack_require__(9);
	
	var _sat2 = _interopRequireDefault(_sat);
	
	var _Sprite2 = __webpack_require__(7);
	
	var _Sprite3 = _interopRequireDefault(_Sprite2);
	
	var _Constants = __webpack_require__(14);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var V = _sat2.default.Vector;
	
	var ship, game;
	var x, y, angle;
	var _mass, _enginePower, _turnPower, _cost, _hitpoints;
	
	var ShipModule = function (_Sprite) {
	  _inherits(ShipModule, _Sprite);
	
	  function ShipModule(ship, x, y, mass, enginePower, turnPower, cost, hp, powerGeneration) {
	    var width = arguments.length <= 9 || arguments[9] === undefined ? _Constants.BLOCK_SIZE : arguments[9];
	    var height = arguments.length <= 10 || arguments[10] === undefined ? _Constants.BLOCK_SIZE : arguments[10];
	
	    _classCallCheck(this, ShipModule);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ShipModule).call(this));
	
	    _this.x = x;
	    _this.y = y;
	
	    _this._width = width;
	    _this._height = height;
	
	    _this.ship = ship;
	    _this.game = ship.game;
	
	    _this.angle = 0;
	
	    _this._mass = mass;
	    _this._enginePower = enginePower;
	    _this._turnPower = turnPower;
	    _this._cost = cost;
	    _this._hitpoints = hp;
	    _this._remainingHitpoints = hp;
	    _this._powerGeneration = powerGeneration;
	    return _this;
	  }
	
	  _createClass(ShipModule, [{
	    key: "recieveDamage",
	    value: function recieveDamage(dmg) {
	      this._remainingHitpoints -= dmg;
	      if (this._remainingHitpoints <= 0) {
	        this.die();
	      }
	    }
	  }, {
	    key: "die",
	    value: function die() {
	      this.ship.removeModule(this);
	    }
	  }, {
	    key: "mass",
	    get: function get() {
	      return this._mass;
	    }
	  }, {
	    key: "enginePower",
	    get: function get() {
	      return this._enginePower;
	    }
	  }, {
	    key: "turnPower",
	    get: function get() {
	      return this._turnPower;
	    }
	  }, {
	    key: "cost",
	    get: function get() {
	      return this._cost;
	    }
	  }, {
	    key: "hp",
	    get: function get() {
	      return this._hitpoints;
	    }
	  }, {
	    key: "powerGeneration",
	    get: function get() {
	      return this._powerGeneration;
	    }
	  }, {
	    key: "height",
	    get: function get() {
	      return this._height;
	    }
	  }, {
	    key: "globalAngle",
	    get: function get() {
	      return this.angle + this.ship.angle;
	    }
	  }, {
	    key: "drawParent",
	    get: function get() {
	      return this.ship;
	    }
	  }, {
	    key: "width",
	    get: function get() {
	      return this._width;
	    }
	  }, {
	    key: "globalX",
	    get: function get() {
	      return this.worldPos[0];
	    }
	  }, {
	    key: "globalY",
	    get: function get() {
	      return this.worldPos[1];
	    }
	  }, {
	    key: "worldPos",
	    get: function get() {
	      var shipAngle = this.ship.angle + Math.PI / 2;
	      var shipCenterOffestX = this.x + _Constants.BLOCK_SIZE / 2 - this.ship.pivotX;
	      var shipCenterOffestY = this.y + _Constants.BLOCK_SIZE / 2 - this.ship.pivotY;
	
	      var x = this.ship.x + Math.cos(shipAngle) * shipCenterOffestX - Math.sin(shipAngle) * shipCenterOffestY;
	      var y = this.ship.y + Math.sin(shipAngle) * shipCenterOffestX + Math.cos(shipAngle) * shipCenterOffestY;
	      return [x, y];
	    }
	  }]);
	
	  return ShipModule;
	}(_Sprite3.default);
	
	exports.default = ShipModule;

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var DEGREE = exports.DEGREE = Math.PI / 180;
	var BLOCK_SIZE = exports.BLOCK_SIZE = 15;

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.loadImage = loadImage;
	
	var cache = {};
	
	var hc = document.getElementById("helperCanvas");
	
	function loadImage(gfx) {
	  var colorIt = arguments.length <= 1 || arguments[1] === undefined ? "#999999" : arguments[1];
	
	  var cacheKey = gfx + colorIt;
	  if (cache[cacheKey]) {
	    return cache[cacheKey];
	  }
	  var parser = new DOMParser();
	  var data = [unescape(gfx).substring(0, gfx.indexOf(",") + 1), unescape(gfx).substring(gfx.indexOf(",") + 1)];
	  var xmlDoc = parser.parseFromString(data[1], "text/xml");
	  var color = xmlDoc.getElementById("teamColor");
	  if (color) {
	    color.style.fill = colorIt;
	  }
	
	  data[1] = new XMLSerializer().serializeToString(xmlDoc.documentElement);
	
	  cache[cacheKey] = renderSvg(data[0] + data[1], 16, 16);
	  return cache[cacheKey];
	}
	
	function renderSvg(svg, w, h) {
	  var img = new Image();
	  img.src = svg;
	
	  hc.setAttribute("width", w);
	  hc.setAttribute("height", h);
	
	  var ctx = hc.getContext('2d');
	  ctx.clearRect(0, 0, w, h);
	  ctx.drawImage(img, 0, 0, w, h);
	  var imgdata = hc.toDataURL("image/png");
	
	  var rimg = new Image();
	  rimg.src = imgdata;
	  return rimg;
	}

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='UTF-8' standalone='no'?%3E %3C!-- Created with Inkscape (http://www.inkscape.org/) --%3E %3Csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' width='100' height='100' viewBox='0 0 100 100' id='svg2' version='1.1' inkscape:version='0.91 r13725' sodipodi:docname='engine.svg'%3E %3Cdefs id='defs4'%3E %3ClinearGradient inkscape:collect='always' id='linearGradient4332'%3E %3Cstop style='stop-color:%23000000;stop-opacity:1;' offset='0' id='stop4334' /%3E %3Cstop style='stop-color:%23000000;stop-opacity:0;' offset='1' id='stop4336' /%3E %3C/linearGradient%3E %3ClinearGradient inkscape:collect='always' xlink:href='%23linearGradient4332' id='linearGradient4338' x1='4.7307509e-009' y1='975.41113' x2='99.996306' y2='975.41113' gradientUnits='userSpaceOnUse' /%3E %3C/defs%3E %3Csodipodi:namedview id='base' pagecolor='%23ffffff' bordercolor='%23666666' borderopacity='1.0' inkscape:pageopacity='0.0' inkscape:pageshadow='2' inkscape:zoom='11.2' inkscape:cx='64.435752' inkscape:cy='63.279261' inkscape:document-units='px' inkscape:current-layer='layer1' showgrid='false' units='px' inkscape:window-width='2560' inkscape:window-height='1377' inkscape:window-x='-8' inkscape:window-y='-8' inkscape:window-maximized='1' /%3E %3Cmetadata id='metadata7'%3E %3Crdf:RDF%3E %3Ccc:Work rdf:about=''%3E %3Cdc:format%3Eimage/svg+xml%3C/dc:format%3E %3Cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage' /%3E %3Cdc:title%3E%3C/dc:title%3E %3C/cc:Work%3E %3C/rdf:RDF%3E %3C/metadata%3E %3Cg inkscape:label='Layer 1' inkscape:groupmode='layer' id='layer1' transform='translate(0,-952.36216)'%3E %3Cpath style='fill:%23ff00ff;fill-opacity:1;fill-rule:evenodd;stroke:%23000000;stroke-width:0.99342591px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' d='m 90.012486,997.46595 9.373568,-44.50913 -98.75727273,0 10.44836473,44.50913 c 0,0 24.758938,-20.00408 39.46767,-20.00408 14.708733,0 39.46767,20.00408 39.46767,20.00408 z' id='teamColor' inkscape:connector-curvature='0' sodipodi:nodetypes='ccccsc' /%3E %3Cpath style='fill:%23ffffff;fill-opacity:0.59610027;fill-rule:evenodd;stroke:url(%23linearGradient4338);stroke-width:0.99342591px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' d='m 90.010522,997.46595 9.373568,-44.50913 -98.75727299,0 10.44836499,44.50913 c 0,0 24.758938,-20.00408 39.46767,-20.00408 14.708733,0 39.46767,20.00408 39.46767,20.00408 z' id='teamColor-8' inkscape:connector-curvature='0' sodipodi:nodetypes='ccccsc' /%3E %3C/g%3E %3C/svg%3E"

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _ShipModule2 = __webpack_require__(13);
	
	var _ShipModule3 = _interopRequireDefault(_ShipModule2);
	
	var _Constants = __webpack_require__(14);
	
	var _ImageLoader = __webpack_require__(15);
	
	var _core = __webpack_require__(18);
	
	var _core2 = _interopRequireDefault(_core);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var x;
	var y;
	
	var MASS = 5;
	var ENGINE_POWER = 0;
	var TURN_POWER = 0;
	var COST = 0;
	var HITPOINTS = 5;
	var POWER_GENERATION = 1;
	
	var Core = function (_ShipModule) {
	  _inherits(Core, _ShipModule);
	
	  function Core(ship, x, y) {
	    _classCallCheck(this, Core);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Core).call(this, ship, x, y, MASS, ENGINE_POWER, TURN_POWER, COST, HITPOINTS, POWER_GENERATION));
	
	    _this.img = (0, _ImageLoader.loadImage)(_core2.default, ship.color);
	    return _this;
	  }
	
	  _createClass(Core, [{
	    key: "draw",
	    value: function draw(screen) {
	      screen.save();
	      screen.translate(this.x, this.y);
	
	      screen.drawImage(this.img, 0, 0, this.width, this.height);
	      screen.restore();
	    }
	  }, {
	    key: "die",
	    value: function die() {
	      _get(Object.getPrototypeOf(Core.prototype), "die", this).call(this);
	      this.ship.die();
	    }
	  }]);
	
	  return Core;
	}(_ShipModule3.default);
	
	exports.default = Core;

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='UTF-8' standalone='no'?%3E %3C!-- Created with Inkscape (http://www.inkscape.org/) --%3E %3Csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' width='100' height='100' viewBox='0 0 100 100' id='svg2' version='1.1' inkscape:version='0.91 r13725' sodipodi:docname='core.svg'%3E %3Cdefs id='defs4'%3E %3ClinearGradient inkscape:collect='always' id='linearGradient4356'%3E %3Cstop style='stop-color:%23ffffff;stop-opacity:1;' offset='0' id='stop4358' /%3E %3Cstop style='stop-color:%23ffffff;stop-opacity:0;' offset='1' id='stop4360' /%3E %3C/linearGradient%3E %3CradialGradient inkscape:collect='always' xlink:href='%23linearGradient4356' id='radialGradient4364' cx='43.400658' cy='991.88159' fx='43.400658' fy='991.88159' r='34.999996' gradientTransform='matrix(1.2038183,-0.02529438,0.02594309,1.2346923,-34.496847,-231.38725)' gradientUnits='userSpaceOnUse' /%3E %3C/defs%3E %3Csodipodi:namedview id='base' pagecolor='%23ffffff' bordercolor='%23666666' borderopacity='1.0' inkscape:pageopacity='0.0' inkscape:pageshadow='2' inkscape:zoom='11.2' inkscape:cx='64.435752' inkscape:cy='50.817855' inkscape:document-units='px' inkscape:current-layer='layer1' showgrid='false' units='px' inkscape:window-width='2560' inkscape:window-height='1377' inkscape:window-x='-8' inkscape:window-y='-8' inkscape:window-maximized='1' /%3E %3Cmetadata id='metadata7'%3E %3Crdf:RDF%3E %3Ccc:Work rdf:about=''%3E %3Cdc:format%3Eimage/svg+xml%3C/dc:format%3E %3Cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage' /%3E %3Cdc:title%3E%3C/dc:title%3E %3C/cc:Work%3E %3C/rdf:RDF%3E %3C/metadata%3E %3Cg inkscape:label='Layer 1' inkscape:groupmode='layer' id='layer1' transform='translate(0,-952.36216)'%3E %3Crect style='opacity:1;fill:%23ff00ff;fill-opacity:1;stroke:%23000000;stroke-width:1.00300002;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1' id='teamColor' width='99.285713' height='99.910713' x='0.53571427' y='952.54071' /%3E %3Crect style='opacity:1;fill:%23000000;fill-opacity:0.46796659;stroke:%23000000;stroke-width:1.00300002;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1' id='rect4352' width='90' height='90' x='5.5015001' y='956.86066' ry='14.464286' /%3E %3Cellipse style='opacity:1;fill:url(%23radialGradient4364);fill-opacity:1;stroke:%23000000;stroke-width:1.13432479;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1' id='path4354' cx='50' cy='1002.3621' rx='34.432835' ry='34.432838' /%3E %3C/g%3E %3C/svg%3E"

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ShipModule2 = __webpack_require__(13);
	
	var _ShipModule3 = _interopRequireDefault(_ShipModule2);
	
	var _ImageLoader = __webpack_require__(15);
	
	var _box = __webpack_require__(20);
	
	var _box2 = _interopRequireDefault(_box);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MASS = 300;
	var ENGINE_POWER = 0;
	var TURN_POWER = 0;
	var COST = 5;
	var HITPOINTS = 50;
	var POWER_GENERATION = 0;
	
	var Armor = function (_ShipModule) {
	  _inherits(Armor, _ShipModule);
	
	  function Armor(ship, x, y) {
	    _classCallCheck(this, Armor);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Armor).call(this, ship, x, y, MASS, ENGINE_POWER, TURN_POWER, COST, HITPOINTS, POWER_GENERATION));
	
	    _this.img = (0, _ImageLoader.loadImage)(_box2.default, ship.color);
	    return _this;
	  }
	
	  _createClass(Armor, [{
	    key: "draw",
	    value: function draw(screen) {
	      screen.save();
	      screen.translate(this.x, this.y);
	      screen.fillStyle = this.ship.color;
	      screen.drawImage(this.img, 0, 0, this.width, this.height);
	      screen.restore();
	    }
	  }]);
	
	  return Armor;
	}(_ShipModule3.default);
	
	exports.default = Armor;

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='UTF-8' standalone='no'?%3E %3C!-- Created with Inkscape (http://www.inkscape.org/) --%3E %3Csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' width='100' height='100' viewBox='0 0 100 100' id='svg2' version='1.1' inkscape:version='0.91 r13725' sodipodi:docname='box.svg'%3E %3Cdefs id='defs4'%3E %3ClinearGradient inkscape:collect='always' id='linearGradient4173'%3E %3Cstop style='stop-color:%23ffffff;stop-opacity:1;' offset='0' id='stop4175' /%3E %3Cstop style='stop-color:%23ffffff;stop-opacity:0;' offset='1' id='stop4177' /%3E %3C/linearGradient%3E %3CradialGradient inkscape:collect='always' xlink:href='%23linearGradient4173' id='radialGradient4187' cx='97.612335' cy='1013.8953' fx='97.612335' fy='1013.8953' r='50.000019' gradientUnits='userSpaceOnUse' gradientTransform='matrix(0.00552191,1.2464515,-1.6732348,0.0074126,1697.2854,824.7847)' spreadMethod='reflect' /%3E %3C/defs%3E %3Csodipodi:namedview id='base' pagecolor='%23ffffff' bordercolor='%23666666' borderopacity='1.0' inkscape:pageopacity='0.0' inkscape:pageshadow='2' inkscape:zoom='11.2' inkscape:cx='34.816822' inkscape:cy='47.586894' inkscape:document-units='px' inkscape:current-layer='layer1' showgrid='false' units='px' inkscape:window-width='2560' inkscape:window-height='1377' inkscape:window-x='-8' inkscape:window-y='-8' inkscape:window-maximized='1' /%3E %3Cmetadata id='metadata7'%3E %3Crdf:RDF%3E %3Ccc:Work rdf:about=''%3E %3Cdc:format%3Eimage/svg+xml%3C/dc:format%3E %3Cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage' /%3E %3Cdc:title%3E%3C/dc:title%3E %3C/cc:Work%3E %3C/rdf:RDF%3E %3C/metadata%3E %3Cg inkscape:label='Layer 1' inkscape:groupmode='layer' id='layer1' transform='translate(0,-952.36216)'%3E %3Crect style='fill:%23ff00ff;fill-opacity:1;fill-rule:evenodd;stroke:%23000000;stroke-width:1.0029577px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' id='teamColor' width='98.99704' height='98.99704' x='0.50147885' y='952.86365' /%3E %3Crect style='fill:url(%23radialGradient4187);fill-rule:evenodd;stroke:%23000000;stroke-width:1.003;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1;fill-opacity:1;opacity:0.533;stroke-miterlimit:4;stroke-dasharray:none' id='rect3344-0' width='98.99704' height='98.99704' x='0.50147885' y='952.86365' /%3E %3C/g%3E %3C/svg%3E"

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ShipModule2 = __webpack_require__(13);
	
	var _ShipModule3 = _interopRequireDefault(_ShipModule2);
	
	var _Constants = __webpack_require__(14);
	
	var _ImageLoader = __webpack_require__(15);
	
	var _wing_right = __webpack_require__(22);
	
	var _wing_right2 = _interopRequireDefault(_wing_right);
	
	var _wing_left = __webpack_require__(23);
	
	var _wing_left2 = _interopRequireDefault(_wing_left);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MASS = 50;
	var ENGINE_POWER = 0;
	var TURN_POWER = 35;
	var COST = 5;
	var HITPOINTS = 10;
	var POWER_GENERATION = 0;
	
	var Wing = function (_ShipModule) {
	  _inherits(Wing, _ShipModule);
	
	  function Wing(ship, x, y) {
	    _classCallCheck(this, Wing);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Wing).call(this, ship, x, y, MASS, ENGINE_POWER, TURN_POWER, COST, HITPOINTS, POWER_GENERATION, _Constants.BLOCK_SIZE, _Constants.BLOCK_SIZE));
	
	    if (x <= _this.ship.pivotX) {
	      _this.img = (0, _ImageLoader.loadImage)(_wing_left2.default, ship.color);
	    } else {
	      _this.img = (0, _ImageLoader.loadImage)(_wing_right2.default, ship.color);
	    }
	    return _this;
	  }
	
	  _createClass(Wing, [{
	    key: "draw",
	    value: function draw(screen) {
	      screen.save();
	      screen.translate(this.x, this.y);
	
	      screen.drawImage(this.img, 0, 0, this.width, this.height);
	
	      screen.restore();
	    }
	  }]);
	
	  return Wing;
	}(_ShipModule3.default);
	
	exports.default = Wing;

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='UTF-8' standalone='no'?%3E %3C!-- Created with Inkscape (http://www.inkscape.org/) --%3E %3Csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' width='100' height='100' viewBox='0 0 100 100' id='svg2' version='1.1' inkscape:version='0.91 r13725' sodipodi:docname='wing.svg'%3E %3Cdefs id='defs4'%3E %3ClinearGradient inkscape:collect='always' id='linearGradient4246'%3E %3Cstop style='stop-color:%23ffffff;stop-opacity:1;' offset='0' id='stop4248' /%3E %3Cstop style='stop-color:%23ffffff;stop-opacity:0;' offset='1' id='stop4250' /%3E %3C/linearGradient%3E %3ClinearGradient inkscape:collect='always' id='linearGradient4214'%3E %3Cstop style='stop-color:%23ffffff;stop-opacity:1;' offset='0' id='stop4216' /%3E %3Cstop style='stop-color:%23ffffff;stop-opacity:0' offset='1' id='stop4218' /%3E %3C/linearGradient%3E %3ClinearGradient inkscape:collect='always' xlink:href='%23linearGradient4214' id='linearGradient4220' x1='22.821428' y1='999.80859' x2='16.214291' y2='956.68353' gradientUnits='userSpaceOnUse' /%3E %3ClinearGradient gradientTransform='translate(-0.08928596,22.589323)' inkscape:collect='always' xlink:href='%23linearGradient4246' id='linearGradient4252-1' x1='31.517857' y1='1027.0942' x2='28.303576' y2='979.5943' gradientUnits='userSpaceOnUse' /%3E %3C/defs%3E %3Csodipodi:namedview id='base' pagecolor='%23ffffff' bordercolor='%23666666' borderopacity='1.0' inkscape:pageopacity='0.0' inkscape:pageshadow='2' inkscape:zoom='11.2' inkscape:cx='34.816822' inkscape:cy='47.586894' inkscape:document-units='px' inkscape:current-layer='layer1' showgrid='false' units='px' inkscape:window-width='2560' inkscape:window-height='1377' inkscape:window-x='-8' inkscape:window-y='-8' inkscape:window-maximized='1' /%3E %3Cmetadata id='metadata7'%3E %3Crdf:RDF%3E %3Ccc:Work rdf:about=''%3E %3Cdc:format%3Eimage/svg+xml%3C/dc:format%3E %3Cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage' /%3E %3Cdc:title%3E%3C/dc:title%3E %3C/cc:Work%3E %3C/rdf:RDF%3E %3C/metadata%3E %3Cg inkscape:label='Layer 1' inkscape:groupmode='layer' id='layer1' transform='translate(0,-952.36216)'%3E %3Cpath style='fill:%23ff00ff;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' d='M 0.67857143,953.11212 0.5,1051.8622 l 100.08929,0 -64.196433,-89.46437 z' id='teamColor' inkscape:connector-curvature='0' sodipodi:nodetypes='ccccc' /%3E %3Cpath style='fill:url(%23linearGradient4220);fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' d='M 0.76785714,952.3978 0.67857143,1004.0051 62.107147,998.46934 36.035714,962.93351 Z' id='teamColor-6' inkscape:connector-curvature='0' sodipodi:nodetypes='ccccc' /%3E %3Cpath style='fill:url(%23linearGradient4252-1);fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' d='M 0.98214047,1000.6657 0.89285533,1051.7373 100,1051.4694 60.98214,997.45143 Z' id='teamColor-6-2-9' inkscape:connector-curvature='0' sodipodi:nodetypes='ccccc' /%3E %3Cpath style='fill:none;fill-opacity:1;fill-rule:evenodd;stroke:%23000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' d='M 0.76785714,953.02275 0.5,1051.8622 l 100.08929,0 -64.196433,-89.46445 z' id='teamColor-1' inkscape:connector-curvature='0' sodipodi:nodetypes='ccccc' /%3E %3C/g%3E %3C/svg%3E"

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='UTF-8' standalone='no'?%3E %3C!-- Created with Inkscape (http://www.inkscape.org/) --%3E %3Csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' width='100' height='100' viewBox='0 0 100 100' id='svg2' version='1.1' inkscape:version='0.91 r13725' sodipodi:docname='wing_left.svg'%3E %3Cdefs id='defs4'%3E %3ClinearGradient inkscape:collect='always' id='linearGradient4246'%3E %3Cstop style='stop-color:%23ffffff;stop-opacity:1;' offset='0' id='stop4248' /%3E %3Cstop style='stop-color:%23ffffff;stop-opacity:0;' offset='1' id='stop4250' /%3E %3C/linearGradient%3E %3ClinearGradient inkscape:collect='always' id='linearGradient4214'%3E %3Cstop style='stop-color:%23ffffff;stop-opacity:1;' offset='0' id='stop4216' /%3E %3Cstop style='stop-color:%23ffffff;stop-opacity:0' offset='1' id='stop4218' /%3E %3C/linearGradient%3E %3ClinearGradient inkscape:collect='always' xlink:href='%23linearGradient4214' id='linearGradient4220' x1='22.821428' y1='999.80859' x2='16.214291' y2='956.68353' gradientUnits='userSpaceOnUse' /%3E %3ClinearGradient gradientTransform='translate(-0.08928596,22.589323)' inkscape:collect='always' xlink:href='%23linearGradient4246' id='linearGradient4252-1' x1='31.517857' y1='1027.0942' x2='28.303576' y2='979.5943' gradientUnits='userSpaceOnUse' /%3E %3C/defs%3E %3Csodipodi:namedview id='base' pagecolor='%23ffffff' bordercolor='%23666666' borderopacity='1.0' inkscape:pageopacity='0.0' inkscape:pageshadow='2' inkscape:zoom='11.2' inkscape:cx='34.816822' inkscape:cy='47.586894' inkscape:document-units='px' inkscape:current-layer='layer1' showgrid='false' units='px' inkscape:window-width='2560' inkscape:window-height='1377' inkscape:window-x='-8' inkscape:window-y='-8' inkscape:window-maximized='1' /%3E %3Cmetadata id='metadata7'%3E %3Crdf:RDF%3E %3Ccc:Work rdf:about=''%3E %3Cdc:format%3Eimage/svg+xml%3C/dc:format%3E %3Cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage' /%3E %3Cdc:title%3E%3C/dc:title%3E %3C/cc:Work%3E %3C/rdf:RDF%3E %3C/metadata%3E %3Cg inkscape:label='Layer 1' inkscape:groupmode='layer' id='layer1' transform='translate(0,-952.36216)'%3E %3Cg id='g4383' transform='matrix(-1,0,0,1,101.56212,0)'%3E %3Cpath sodipodi:nodetypes='ccccc' inkscape:connector-curvature='0' id='teamColor' d='M 0.67857143,953.11212 0.5,1051.8622 l 100.08929,0 -64.196433,-89.46437 z' style='fill:%23ff00ff;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' /%3E %3Cpath sodipodi:nodetypes='ccccc' inkscape:connector-curvature='0' id='teamColor-6' d='M 0.76785714,952.3978 0.67857143,1004.0051 62.107147,998.46934 36.035714,962.93351 Z' style='fill:url(%23linearGradient4220);fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' /%3E %3Cpath sodipodi:nodetypes='ccccc' inkscape:connector-curvature='0' id='teamColor-6-2-9' d='M 0.98214047,1000.6657 0.89285533,1051.7373 100,1051.4694 60.98214,997.45143 Z' style='fill:url(%23linearGradient4252-1);fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' /%3E %3Cpath sodipodi:nodetypes='ccccc' inkscape:connector-curvature='0' id='teamColor-1' d='M 0.76785714,953.02275 0.5,1051.8622 l 100.08929,0 -64.196433,-89.46445 z' style='fill:none;fill-opacity:1;fill-rule:evenodd;stroke:%23000000;stroke-width:1px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' /%3E %3C/g%3E %3C/g%3E %3C/svg%3E"

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Constants = __webpack_require__(14);
	
	var _ShipModule2 = __webpack_require__(13);
	
	var _ShipModule3 = _interopRequireDefault(_ShipModule2);
	
	var _Bullet = __webpack_require__(25);
	
	var _Bullet2 = _interopRequireDefault(_Bullet);
	
	var _ImageLoader = __webpack_require__(15);
	
	var _gun_base = __webpack_require__(26);
	
	var _gun_base2 = _interopRequireDefault(_gun_base);
	
	var _gun_turret = __webpack_require__(27);
	
	var _gun_turret2 = _interopRequireDefault(_gun_turret);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MASS = 50;
	var ENGINE_POWER = 0;
	var TURN_POWER = 0;
	var COST = 25;
	var HITPOINTS = 10;
	var POWER_GENERATION = 0;
	
	var Gun = function (_ShipModule) {
	  _inherits(Gun, _ShipModule);
	
	  function Gun(ship, x, y) {
	    _classCallCheck(this, Gun);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Gun).call(this, ship, x, y, MASS, ENGINE_POWER, TURN_POWER, COST, HITPOINTS, POWER_GENERATION));
	
	    _this.timeToReload = 25;
	    _this.reloadTimeLeft = 0;
	
	    _this.img_base = (0, _ImageLoader.loadImage)(_gun_base2.default, ship.color);
	    _this.img_turret = (0, _ImageLoader.loadImage)(_gun_turret2.default, ship.color);
	    return _this;
	  }
	
	  _createClass(Gun, [{
	    key: "draw",
	    value: function draw(screen) {
	      screen.save();
	      screen.translate(this.x, this.y);
	
	      screen.drawImage(this.img_base, 0, 0, this.width, this.height);
	      screen.drawImage(this.img_turret, 0, 0, this.width, this.height);
	
	      screen.fillStyle = this.ship.color;
	      var maxWidth = this.width - 1;
	      screen.fillRect(1, this.height - 2, maxWidth * (1 - this.reloadTimeLeft / this.timeToReload), 1);
	
	      screen.restore();
	    }
	  }, {
	    key: "tick",
	    value: function tick() {
	      this.reloadTimeLeft = Math.max(this.reloadTimeLeft - 1, 0);
	      if (this.ship._firingPrimary && this.reloadTimeLeft <= 0) {
	        this.reloadTimeLeft = this.timeToReload;
	        this.game.spawn(new (Function.prototype.bind.apply(_Bullet2.default, [null].concat([this], _toConsumableArray(this.worldPos), [this.ship.angle])))(), "SHOTS");
	      }
	    }
	  }]);
	
	  return Gun;
	}(_ShipModule3.default);
	
	exports.default = Gun;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Sprite2 = __webpack_require__(7);
	
	var _Sprite3 = _interopRequireDefault(_Sprite2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DEGREE = Math.PI / 180;
	
	var _x, _y, gun;
	
	var Bullet = function (_Sprite) {
	  _inherits(Bullet, _Sprite);
	
	  function Bullet(gun, x, y, angle) {
	    _classCallCheck(this, Bullet);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Bullet).call(this));
	
	    _this.gun = gun;
	    _this._x = x;
	    _this._y = y;
	    _this.speed = 6;
	    _this.angle = angle;
	    _this.age = 0;
	
	    _this.damage = 2;
	
	    _this.dx = Math.cos(_this.angle) * _this.speed;
	    _this.dy = Math.sin(_this.angle) * _this.speed;
	    return _this;
	  }
	
	  _createClass(Bullet, [{
	    key: "tick",
	    value: function tick() {
	      this.age++;
	      this._x += this.dx;
	      this._y += this.dy;
	
	      if (this.age > 100) {
	        this.die();
	      }
	
	      this.wrapAroundWorld();
	    }
	  }, {
	    key: "die",
	    value: function die() {
	      this.gun.game.removeFromLayer(this);
	    }
	  }, {
	    key: "draw",
	    value: function draw(screen) {
	
	      screen.save();
	      screen.translate(this._x, this._y);
	      screen.rotate(90 * DEGREE);
	      screen.rotate(this.angle);
	
	      screen.beginPath();
	      screen.lineTo(-1, 0);
	      screen.lineTo(-1, -3);
	      screen.lineTo(0, -5);
	      screen.lineTo(1, -3);
	      screen.lineTo(1, 0);
	
	      screen.closePath();
	      screen.fillStyle = this.gun.ship.color;
	      screen.fill();
	
	      screen.restore();
	    }
	  }, {
	    key: "wrapAroundWorld",
	    value: function wrapAroundWorld() {
	      var cw = this.gun.game.canvas.getAttribute("width");
	      var ch = this.gun.game.canvas.getAttribute("height");
	      if (this._x < 0) {
	        this._x = cw - this.x;
	      } else if (this._x > cw) {
	        this._x = this._x - cw;
	      }
	      if (this._y < 0) {
	        this._y = ch - this._y;
	      } else if (this._y > ch) {
	        this._y = this._y - ch;
	      }
	    }
	  }, {
	    key: "collide",
	    value: function collide(collidedWith) {
	      collidedWith.recieveDamage(this.damage);
	      this.die();
	    }
	  }, {
	    key: "width",
	    get: function get() {
	      return 2;
	    }
	  }, {
	    key: "height",
	    get: function get() {
	      return 5;
	    }
	  }, {
	    key: "globalX",
	    get: function get() {
	      return this._x;
	    }
	  }, {
	    key: "globalY",
	    get: function get() {
	      return this._y;
	    }
	  }, {
	    key: "globalAngle",
	    get: function get() {
	      return this.angle;
	    }
	  }]);
	
	  return Bullet;
	}(_Sprite3.default);
	
	exports.default = Bullet;

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='UTF-8' standalone='no'?%3E %3C!-- Created with Inkscape (http://www.inkscape.org/) --%3E %3Csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' width='100' height='100' viewBox='0 0 100 100' id='svg2' version='1.1' inkscape:version='0.91 r13725' sodipodi:docname='gun_base.svg'%3E %3Cdefs id='defs4' /%3E %3Csodipodi:namedview id='base' pagecolor='%23ffffff' bordercolor='%23666666' borderopacity='1.0' inkscape:pageopacity='0.0' inkscape:pageshadow='2' inkscape:zoom='11.2' inkscape:cx='64.435752' inkscape:cy='50.817855' inkscape:document-units='px' inkscape:current-layer='layer1' showgrid='false' units='px' inkscape:window-width='2560' inkscape:window-height='1377' inkscape:window-x='-8' inkscape:window-y='-8' inkscape:window-maximized='1' /%3E %3Cmetadata id='metadata7'%3E %3Crdf:RDF%3E %3Ccc:Work rdf:about=''%3E %3Cdc:format%3Eimage/svg+xml%3C/dc:format%3E %3Cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage' /%3E %3Cdc:title /%3E %3C/cc:Work%3E %3C/rdf:RDF%3E %3C/metadata%3E %3Cg inkscape:label='Layer 1' inkscape:groupmode='layer' id='layer1' transform='translate(0,-952.36216)'%3E %3Cpath style='fill:%23ff00ff;fill-opacity:0.4679666;fill-rule:evenodd;stroke:%23000000;stroke-width:0.95370758px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' d='m 4.9782926,965.68075 -4.64505302,86.20455 99.42199942,0 -4.73438,-86.20455 c -45.199939,-4.78915 -45.199939,-4.70797 -90.0425664,0 z' id='teamColor' inkscape:connector-curvature='0' sodipodi:nodetypes='ccccc' /%3E %3Cpath style='fill:%23000000;fill-opacity:0.59888575;fill-rule:evenodd;stroke:%23000000;stroke-width:0.95370758px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' d='m 4.9782926,965.68075 -4.64505302,86.20455 99.42199942,0 -4.73438,-86.20455 c -45.199939,-4.78915 -45.199939,-4.70797 -90.0425664,0 z' id='teamColor-3' inkscape:connector-curvature='0' sodipodi:nodetypes='ccccc' /%3E %3C/g%3E %3C/svg%3E"

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='UTF-8' standalone='no'?%3E %3C!-- Created with Inkscape (http://www.inkscape.org/) --%3E %3Csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' width='100' height='100' viewBox='0 0 100 100' id='svg2' version='1.1' inkscape:version='0.91 r13725' sodipodi:docname='gun_turret.svg'%3E %3Cdefs id='defs4' /%3E %3Csodipodi:namedview id='base' pagecolor='%23ffffff' bordercolor='%23666666' borderopacity='1.0' inkscape:pageopacity='0.0' inkscape:pageshadow='2' inkscape:zoom='11.2' inkscape:cx='64.435752' inkscape:cy='50.817855' inkscape:document-units='px' inkscape:current-layer='layer1' showgrid='false' units='px' inkscape:window-width='2560' inkscape:window-height='1377' inkscape:window-x='-8' inkscape:window-y='-8' inkscape:window-maximized='1' /%3E %3Cmetadata id='metadata7'%3E %3Crdf:RDF%3E %3Ccc:Work rdf:about=''%3E %3Cdc:format%3Eimage/svg+xml%3C/dc:format%3E %3Cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage' /%3E %3Cdc:title%3E%3C/dc:title%3E %3C/cc:Work%3E %3C/rdf:RDF%3E %3C/metadata%3E %3Cg inkscape:label='Layer 1' inkscape:groupmode='layer' id='layer1' transform='translate(0,-952.36216)'%3E %3Cellipse style='opacity:1;fill:%23000000;fill-opacity:1;stroke:%23000000;stroke-width:1.45630145;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1' id='path4415' cx='49.86607' cy='1020.264' rx='20.621565' ry='25.532278' /%3E %3Crect ry='4.2857318' style='opacity:1;fill:%23000000;fill-opacity:1;stroke:%23000000;stroke-width:1.71063542;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1' id='rect4417' width='30.185223' height='54.024494' x='34.460957' y='959.0553' /%3E %3C/g%3E %3C/svg%3E"

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Constants = __webpack_require__(14);
	
	var _ShipModule2 = __webpack_require__(13);
	
	var _ShipModule3 = _interopRequireDefault(_ShipModule2);
	
	var _Beam = __webpack_require__(29);
	
	var _Beam2 = _interopRequireDefault(_Beam);
	
	var _ImageLoader = __webpack_require__(15);
	
	var _gun_base = __webpack_require__(30);
	
	var _gun_base2 = _interopRequireDefault(_gun_base);
	
	var _gun_turret = __webpack_require__(31);
	
	var _gun_turret2 = _interopRequireDefault(_gun_turret);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MASS = 150;
	var ENGINE_POWER = 0;
	var TURN_POWER = 0;
	var COST = 75;
	var HITPOINTS = 10;
	var POWER_GENERATION = 0;
	
	var Gun = function (_ShipModule) {
	  _inherits(Gun, _ShipModule);
	
	  function Gun(ship, x, y) {
	    _classCallCheck(this, Gun);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Gun).call(this, ship, x, y, MASS, ENGINE_POWER, TURN_POWER, COST, HITPOINTS, POWER_GENERATION));
	
	    _this.img_base = (0, _ImageLoader.loadImage)(_gun_base2.default, ship.color);
	    _this.img_turret = (0, _ImageLoader.loadImage)(_gun_turret2.default, ship.color);
	    return _this;
	  }
	
	  _createClass(Gun, [{
	    key: "draw",
	    value: function draw(screen) {
	      screen.save();
	      screen.translate(this.x, this.y);
	
	      screen.drawImage(this.img_base, 0, 0, this.width, this.height);
	
	      screen.fillStyle = this.ship.color;
	      var maxWidth = this.width - 1;
	      screen.fillRect(1, this.height - 2, maxWidth * (1 - this.reloadTimeLeft / this.timeToReload), 1);
	
	      screen.restore();
	    }
	  }, {
	    key: "tick",
	    value: function tick() {
	      if (this.ship._firingPrimary && this._beam === undefined) {
	        this._beam = new _Beam2.default(this);
	        this.game.spawn(this._beam, "UNDER_SHIPS");
	      } else if (!this.ship._firingPrimary && this._beam !== undefined) {
	        this.game.removeFromLayer(this._beam, "UNDER_SHIPS");
	        this._beam = undefined;
	      }
	    }
	  }]);
	
	  return Gun;
	}(_ShipModule3.default);
	
	exports.default = Gun;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Sprite2 = __webpack_require__(7);
	
	var _Sprite3 = _interopRequireDefault(_Sprite2);
	
	var _sat = __webpack_require__(9);
	
	var _sat2 = _interopRequireDefault(_sat);
	
	var _Constants = __webpack_require__(14);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var V = _sat2.default.Vector;
	var P = _sat2.default.Polygon;
	var B = _sat2.default.Box;
	
	var _x, _y, gun;
	
	var Beam = function (_Sprite) {
	  _inherits(Beam, _Sprite);
	
	  function Beam(gun) {
	    _classCallCheck(this, Beam);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Beam).call(this));
	
	    _this.gun = gun;
	    _this._x = _this.gun._x;
	    _this._y = _this.gun._y;
	
	    _this.damage = 0.2;
	
	    _this.dx = Math.cos(_this.angle) * _this.speed;
	    _this.dy = Math.sin(_this.angle) * _this.speed;
	    return _this;
	  }
	
	  _createClass(Beam, [{
	    key: "tick",
	    value: function tick() {
	      this._x += this.gun._x;
	      this._y += this.gun._y;
	    }
	  }, {
	    key: "die",
	    value: function die() {
	      this.gun.game.removeFromLayer(this);
	    }
	  }, {
	    key: "draw",
	    value: function draw(screen) {
	      screen.save();
	      screen.translate(this.gun.globalX, this.gun.globalY);
	      screen.rotate(90 * _Constants.DEGREE);
	      screen.rotate(this.angle);
	      screen.translate(-this.pivotX, -this.pivotY);
	
	      screen.beginPath();
	      screen.lineTo(0, 0);
	      screen.lineTo(this.width / 2, this.height);
	      screen.lineTo(this.width, 0);
	
	      screen.closePath();
	      screen.fillStyle = this.gun.ship.color;
	      screen.fill();
	
	      screen.restore();
	
	      // super.drawCollisionPoly(screen);
	    }
	  }, {
	    key: "collide",
	    value: function collide(collidedWith) {
	      collidedWith.recieveDamage(this.damage);
	    }
	  }, {
	    key: "angle",
	    get: function get() {
	      return this.gun.globalAngle + Math.PI;
	    }
	  }, {
	    key: "collisionPoly",
	    get: function get() {
	
	      var line = new B(new V(0, 0), 2, -this.height).toPolygon();
	
	      line.translate(-1, 0);
	      line.rotate(this.globalAngle + Math.PI / 2);
	      line.translate(this.globalX, this.globalY);
	
	      return line;
	    }
	  }, {
	    key: "width",
	    get: function get() {
	      return 10;
	    }
	  }, {
	    key: "height",
	    get: function get() {
	      return 120;
	    }
	  }, {
	    key: "pivotX",
	    get: function get() {
	      return this.width / 2;
	    }
	  }, {
	    key: "pivotY",
	    get: function get() {
	      return 0;
	    }
	  }, {
	    key: "worldPos",
	    get: function get() {
	      var shipAngle = this.gun.ship.angle + Math.PI / 2;
	      var shipCenterOffestX = this.x + _Constants.BLOCK_SIZE / 2 - this.ship.pivotX;
	      var shipCenterOffestY = this.y + _Constants.BLOCK_SIZE / 2 - this.ship.pivotY;
	
	      var x = this.ship.x + Math.cos(shipAngle) * shipCenterOffestX - Math.sin(shipAngle) * shipCenterOffestY;
	      var y = this.ship.y + Math.sin(shipAngle) * shipCenterOffestX + Math.cos(shipAngle) * shipCenterOffestY;
	      return [x, y];
	    }
	  }, {
	    key: "globalX",
	    get: function get() {
	      return this.gun.globalX;
	    }
	  }, {
	    key: "globalY",
	    get: function get() {
	      return this.gun.globalY;
	    }
	  }, {
	    key: "globalAngle",
	    get: function get() {
	      return this.gun.ship.globalAngle;
	    }
	  }]);
	
	  return Beam;
	}(_Sprite3.default);
	
	exports.default = Beam;

/***/ },
/* 30 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='UTF-8' standalone='no'?%3E %3C!-- Created with Inkscape (http://www.inkscape.org/) --%3E %3Csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' width='100' height='100' viewBox='0 0 100 100' id='svg2' version='1.1' inkscape:version='0.91 r13725' sodipodi:docname='gun_base.svg'%3E %3Cdefs id='defs4' /%3E %3Csodipodi:namedview id='base' pagecolor='%23ffffff' bordercolor='%23666666' borderopacity='1.0' inkscape:pageopacity='0.0' inkscape:pageshadow='2' inkscape:zoom='11.2' inkscape:cx='64.435752' inkscape:cy='50.817855' inkscape:document-units='px' inkscape:current-layer='layer1' showgrid='false' units='px' inkscape:window-width='2560' inkscape:window-height='1377' inkscape:window-x='-8' inkscape:window-y='-8' inkscape:window-maximized='1' /%3E %3Cmetadata id='metadata7'%3E %3Crdf:RDF%3E %3Ccc:Work rdf:about=''%3E %3Cdc:format%3Eimage/svg+xml%3C/dc:format%3E %3Cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage' /%3E %3Cdc:title /%3E %3C/cc:Work%3E %3C/rdf:RDF%3E %3C/metadata%3E %3Cg inkscape:label='Layer 1' inkscape:groupmode='layer' id='layer1' transform='translate(0,-952.36216)'%3E %3Cpath style='fill:%23ff00ff;fill-opacity:0.4679666;fill-rule:evenodd;stroke:%23000000;stroke-width:0.95370758px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' d='m 4.9782926,965.68075 -4.64505302,86.20455 99.42199942,0 -4.73438,-86.20455 c -45.199939,-4.78915 -45.199939,-4.70797 -90.0425664,0 z' id='teamColor' inkscape:connector-curvature='0' sodipodi:nodetypes='ccccc' /%3E %3Cpath style='fill:%23000000;fill-opacity:0.59888575;fill-rule:evenodd;stroke:%23000000;stroke-width:0.95370758px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1' d='m 4.9782926,965.68075 -4.64505302,86.20455 99.42199942,0 -4.73438,-86.20455 c -45.199939,-4.78915 -45.199939,-4.70797 -90.0425664,0 z' id='teamColor-3' inkscape:connector-curvature='0' sodipodi:nodetypes='ccccc' /%3E %3C/g%3E %3C/svg%3E"

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='UTF-8' standalone='no'?%3E %3C!-- Created with Inkscape (http://www.inkscape.org/) --%3E %3Csvg xmlns:dc='http://purl.org/dc/elements/1.1/' xmlns:cc='http://creativecommons.org/ns%23' xmlns:rdf='http://www.w3.org/1999/02/22-rdf-syntax-ns%23' xmlns:svg='http://www.w3.org/2000/svg' xmlns='http://www.w3.org/2000/svg' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' width='100' height='100' viewBox='0 0 100 100' id='svg2' version='1.1' inkscape:version='0.91 r13725' sodipodi:docname='gun_turret.svg'%3E %3Cdefs id='defs4' /%3E %3Csodipodi:namedview id='base' pagecolor='%23ffffff' bordercolor='%23666666' borderopacity='1.0' inkscape:pageopacity='0.0' inkscape:pageshadow='2' inkscape:zoom='11.2' inkscape:cx='64.435752' inkscape:cy='50.817855' inkscape:document-units='px' inkscape:current-layer='layer1' showgrid='false' units='px' inkscape:window-width='2560' inkscape:window-height='1377' inkscape:window-x='-8' inkscape:window-y='-8' inkscape:window-maximized='1' /%3E %3Cmetadata id='metadata7'%3E %3Crdf:RDF%3E %3Ccc:Work rdf:about=''%3E %3Cdc:format%3Eimage/svg+xml%3C/dc:format%3E %3Cdc:type rdf:resource='http://purl.org/dc/dcmitype/StillImage' /%3E %3Cdc:title%3E%3C/dc:title%3E %3C/cc:Work%3E %3C/rdf:RDF%3E %3C/metadata%3E %3Cg inkscape:label='Layer 1' inkscape:groupmode='layer' id='layer1' transform='translate(0,-952.36216)'%3E %3Cellipse style='opacity:1;fill:%23000000;fill-opacity:1;stroke:%23000000;stroke-width:1.45630145;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1' id='path4415' cx='49.86607' cy='1020.264' rx='20.621565' ry='25.532278' /%3E %3Crect ry='4.2857318' style='opacity:1;fill:%23000000;fill-opacity:1;stroke:%23000000;stroke-width:1.71063542;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1' id='rect4417' width='30.185223' height='54.024494' x='34.460957' y='959.0553' /%3E %3C/g%3E %3C/svg%3E"

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Ship2 = __webpack_require__(6);
	
	var _Ship3 = _interopRequireDefault(_Ship2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DummyShip = function (_Ship) {
	  _inherits(DummyShip, _Ship);
	
	  function DummyShip(game, x, y, angle, schematic) {
	    _classCallCheck(this, DummyShip);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DummyShip).call(this, game, x, y, angle, schematic));
	
	    _this._turningCCW = true;
	    _this._turningCW = false;
	    _this.accelerating = true;
	    _this._firingPrimary = true;
	
	    _this.age = Math.floor(Math.random() * 1000);
	    return _this;
	  }
	
	  _createClass(DummyShip, [{
	    key: "tick",
	    value: function tick() {
	      this.age++;
	
	      if (this.age % 128 == 0) {
	        this._turningCCW = !this._turningCCW;
	      }
	      if (this.age % 200 == 0) {
	        this._turningCW = !this._turningCW;
	      }
	
	      _get(Object.getPrototypeOf(DummyShip.prototype), "tick", this).call(this);
	    }
	  }]);
	
	  return DummyShip;
	}(_Ship3.default);
	
	exports.default = DummyShip;

/***/ },
/* 33 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var KEY_MAP = exports.KEY_MAP = {
	  SHIFT: 16, //SHIFT KEY,
	  SPACE: 32, //SHIFT KEY,
	  W: 87,
	  S: 65,
	  D: 68,
	  LEFT: 37,
	  RIGHT: 39,
	  UP: 38,
	  ENTER: 13,
	  CTRL: 17,
	  NUM_0: 96
	
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _PickableShip = __webpack_require__(35);
	
	var _PickableShip2 = _interopRequireDefault(_PickableShip);
	
	var _Constants = __webpack_require__(14);
	
	var _Utils = __webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LAYERS = {
	  SHIPS: [],
	  UI: []
	};
	
	var PLAYER2_SCHEMATIC = ["  SGS  ", "SEWXWES", "  G G  "];
	
	var _renderLoop;
	var canvas;
	var _pickedShip;
	
	var ShipPicker = function () {
	  function ShipPicker(canvas, schems, title) {
	    _classCallCheck(this, ShipPicker);
	
	    this.schems = schems;
	    this.canvas = canvas;
	    this.title = title;
	    canvas.style.cursor = "auto";
	    canvas.focus();
	
	    this.screen = canvas.getContext('2d');
	    this.screenWidth = canvas.getAttribute("width");
	    this.screenHeight = canvas.getAttribute("height");
	
	    this.init();
	  }
	
	  _createClass(ShipPicker, [{
	    key: "init",
	    value: function init() {
	      var _this = this;
	
	      this.ships = [];
	      var xPos = 300;
	      var placed = 0;
	      this.schems.forEach(function (schem) {
	        _this.ships.push(new _PickableShip2.default(_this, xPos, Math.floor(placed++ / 4) * 150 + 150, -90 * _Constants.DEGREE, schem));
	        xPos = xPos % 800;
	        xPos += 200;
	      });
	
	      this.canvas.onmousemove = this.mouseMove.bind(this);
	      this.canvas.onclick = this.click.bind(this);
	    }
	  }, {
	    key: "click",
	    value: function click(e) {
	      var _this2 = this;
	
	      var x = e.offsetX;
	      var y = e.offsetY;
	      this.ships.forEach(function (ship) {
	        if ((0, _Utils.isPointInSprite)(x, y, ship)) {
	          _this2._pickedShip = ship.schematic;
	        }
	      });
	    }
	  }, {
	    key: "mouseMove",
	    value: function mouseMove(e) {
	      var x = e.offsetX;
	      var y = e.offsetY;
	      var overClickable = false;
	      this.ships.forEach(function (ship) {
	        var highlighted = (0, _Utils.isPointInSprite)(x, y, ship);
	        ship.highlighted = highlighted;
	
	        overClickable = overClickable || highlighted;
	      });
	
	      if (overClickable) {
	        this.canvas.style.cursor = "pointer";
	      } else {
	        this.canvas.style.cursor = "auto";
	      }
	    }
	  }, {
	    key: "tickLayer",
	    value: function tickLayer(sprites) {
	      sprites.forEach(function (s) {
	        return s.tick();
	      });
	    }
	  }, {
	    key: "tick",
	    value: function tick() {
	      this.globalTime++;
	
	      this.tickLayer(LAYERS.SHIPS);
	      this.tickLayer(LAYERS.UI);
	    }
	  }, {
	    key: "draw",
	    value: function draw() {
	      var _this3 = this;
	
	      var s = this.screen;
	      s.save();
	      s.fillStyle = "#eeeeee";
	      s.fillRect(0, 0, this.screenWidth, this.screenHeight);
	
	      s.fillStyle = "#000000";
	      s.textAlign = "center";
	      s.font = "48px serif";
	      s.fillText(this.title, this.screenWidth / 2, 60);
	
	      this.ships.forEach(function (s) {
	        s.draw(_this3.screen);
	      });
	      s.restore();
	    }
	  }, {
	    key: "waitForPick",
	    value: function waitForPick(shipPickedCallback) {
	      var _this4 = this;
	
	      if (this._pickedShip == undefined) {
	        setTimeout(function () {
	          _this4.waitForPick(shipPickedCallback);
	        }, 100);
	      } else {
	        clearInterval(_renderLoop);
	        shipPickedCallback(this._pickedShip);
	      }
	    }
	  }, {
	    key: "pickShips",
	    value: function pickShips(shipPickedCallback) {
	      this.run();
	      this.waitForPick(shipPickedCallback);
	    }
	  }, {
	    key: "run",
	    value: function run() {
	      this.init();
	
	      _renderLoop = setInterval(function () {
	        this.tick();
	        this.draw();
	      }.bind(this), 1000 / 60);
	    }
	  }]);
	
	  return ShipPicker;
	}();
	
	exports.default = ShipPicker;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _Ship2 = __webpack_require__(6);
	
	var _Ship3 = _interopRequireDefault(_Ship2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var PickableShip = function (_Ship) {
	  _inherits(PickableShip, _Ship);
	
	  function PickableShip(game, x, y, angle, schematic) {
	    _classCallCheck(this, PickableShip);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(PickableShip).call(this, game, x, y, angle, schematic));
	  }
	
	  _createClass(PickableShip, [{
	    key: "draw",
	    value: function draw(screen) {
	      if (this.highlighted) {
	        screen.fillStyle = "rgba(0,0,0,0.1)";
	        screen.fillRect(this.x - this.pivotX - 5, this.y - this.pivotY - 5, this.width + 10, this.height + 10);
	      }
	
	      _get(Object.getPrototypeOf(PickableShip.prototype), "draw", this).call(this, screen);
	    }
	  }]);
	
	  return PickableShip;
	}(_Ship3.default);
	
	exports.default = PickableShip;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map