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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var canvas = document.getElementById('game');
	
	var game = new _Game2.default(canvas);
	game.run();

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
	
	var _DummyShip = __webpack_require__(21);
	
	var _DummyShip2 = _interopRequireDefault(_DummyShip);
	
	var _Utils = __webpack_require__(7);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LAYERS = {
	  BACKGROUND: [],
	  SHIPS: [],
	  SHOTS: [],
	  OVERLAY: [],
	  UI: []
	};
	
	var Game = function () {
	  function Game(canvas) {
	    _classCallCheck(this, Game);
	
	    this.canvas = canvas;
	    canvas.focus();
	    this._keyControl = new _KeyControl2.default(this);
	
	    this.renderer = new _Renderer2.default(this);
	  }
	
	  _createClass(Game, [{
	    key: "init",
	    value: function init() {
	      this.globalTime = 0;
	
	      LAYERS.SHIPS.push(new _ControllableShip2.default(this));
	      LAYERS.SHIPS.push(new _DummyShip2.default(this));
	    }
	  }, {
	    key: "tickLayer",
	    value: function tickLayer(sprites) {
	      sprites.forEach(function (s) {
	        return s.tick();
	      });
	    }
	  }, {
	    key: "removeShot",
	    value: function removeShot(toRemove) {
	      var i = LAYERS.SHOTS.indexOf(toRemove);
	      LAYERS.SHOTS.splice(i, 1);
	    }
	  }, {
	    key: "handleCollisions",
	    value: function handleCollisions() {
	      LAYERS.SHIPS.forEach(function (ship) {
	        LAYERS.SHOTS.forEach(function (shot) {
	          if ((0, _Utils.isSpritesColliding)(ship, shot) && shot.gun.ship != ship) {
	            ship.modules.forEach(function (module) {
	              if ((0, _Utils.isSpritesColliding)(module, shot)) {
	                ship.collide(shot);
	                shot.collide(module);
	              }
	            });
	          }
	        });
	      });
	    }
	  }, {
	    key: "tick",
	    value: function tick() {
	      this.globalTime++;
	
	      this.tickLayer(LAYERS.BACKGROUND);
	      this.tickLayer(LAYERS.SHIPS);
	      this.tickLayer(LAYERS.SHOTS);
	      this.tickLayer(LAYERS.OVERLAY);
	      this.tickLayer(LAYERS.UI);
	
	      var collisions = this.handleCollisions();
	    }
	  }, {
	    key: "draw",
	    value: function draw() {
	      this.renderer.render([LAYERS.SHIPS, LAYERS.SHOTS]);
	    }
	  }, {
	    key: "run",
	    value: function run() {
	      this.init();
	
	      setInterval(function () {
	        this.tick();
	        this.draw();
	      }.bind(this), 1000 / 60);
	    }
	  }, {
	    key: "spawn",
	    value: function spawn(sprite) {
	      var layer = arguments.length <= 1 || arguments[1] === undefined ? "SHOTS" : arguments[1];
	
	      LAYERS.SHOTS.push(sprite);
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
	
	var TOOLBAR_HEIGHT = 120;
	
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
	
	var _Sprite2 = __webpack_require__(6);
	
	var _Sprite3 = _interopRequireDefault(_Sprite2);
	
	var _falcon = __webpack_require__(11);
	
	var _falcon2 = _interopRequireDefault(_falcon);
	
	var _Engine = __webpack_require__(12);
	
	var _Engine2 = _interopRequireDefault(_Engine);
	
	var _Core = __webpack_require__(15);
	
	var _Core2 = _interopRequireDefault(_Core);
	
	var _Armor = __webpack_require__(16);
	
	var _Armor2 = _interopRequireDefault(_Armor);
	
	var _Wing = __webpack_require__(17);
	
	var _Wing2 = _interopRequireDefault(_Wing);
	
	var _Gun = __webpack_require__(18);
	
	var _Gun2 = _interopRequireDefault(_Gun);
	
	var _Keys = __webpack_require__(20);
	
	var _Constants = __webpack_require__(14);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SHIP_SCHEMATIC = ["  GGG  ", "GGSSSGG", "WWWXWWW", "SEEEEES"];
	
	var ControllableShip = function (_Sprite) {
	  _inherits(ControllableShip, _Sprite);
	
	  function ControllableShip(game) {
	    _classCallCheck(this, ControllableShip);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ControllableShip).call(this));
	
	    _this.game = game;
	    _this.x = 55;
	    _this.y = 55;
	    _this._pivotX = 0;
	    _this._pivotY = 0;
	
	    _this.mass = 0;
	
	    _this._width = 30;
	    _this._height = 20;
	
	    _this.dx = 0;
	    _this.dy = 0;
	    _this.enginePower = 0;
	
	    _this.angle = 0;
	    _this.turnPower = 0;
	
	    _this.cost = 0;
	
	    _this.turningCCW = false;
	    _this.turningCW = false;
	
	    _this.bindKeys();
	
	    _this.img = new Image();
	    _this.img.src = _falcon2.default;
	
	    _this.loadParts();
	    return _this;
	  }
	
	  _createClass(ControllableShip, [{
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
	    key: "loadParts",
	    value: function loadParts() {
	      this._modules = [];
	
	      for (var row = 0; row < SHIP_SCHEMATIC.length; row++) {
	        var y = row * _Constants.BLOCK_SIZE;
	
	        var partsRow = [];
	        this._modules.push(partsRow);
	        var positions = SHIP_SCHEMATIC[row].split("");
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
	            partsRow.push(new _Wing2.default(this, true, x, y));
	          } else if (block === "X") {
	            this._pivotX = pos * _Constants.BLOCK_SIZE + _Constants.BLOCK_SIZE / 2;
	            this._pivotY = row * _Constants.BLOCK_SIZE + _Constants.BLOCK_SIZE / 2;
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
	
	      this.mass = allParts.map(function (p) {
	        return p.mass;
	      }).reduce(function (a, b) {
	        return a + b;
	      }, 0);
	      this.enginePower = allParts.map(function (p) {
	        return p.enginePower;
	      }).reduce(function (a, b) {
	        return a + b;
	      }, 0);
	      this.turnPower = allParts.map(function (p) {
	        return p.turnPower;
	      }).reduce(function (a, b) {
	        return a + b;
	      }, 0);
	      this.cost = allParts.map(function (p) {
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
	    key: "bindKeys",
	    value: function bindKeys() {
	      var _this2 = this;
	
	      this.game.keyControl.onKeyDown(_Keys.KEY_MAP.ACCELERATE, function () {
	        return _this2.accelerating = true;
	      });
	      this.game.keyControl.onKeyDown(_Keys.KEY_MAP.TURN_CLOCKWISE, function () {
	        return _this2.turningCW = true;
	      });
	      this.game.keyControl.onKeyDown(_Keys.KEY_MAP.TURN_COUNTERCLOCKWISE, function () {
	        return _this2.turningCCW = true;
	      });
	
	      this.game.keyControl.onKeyUp(_Keys.KEY_MAP.ACCELERATE, function () {
	        return _this2.accelerating = false;
	      });
	      this.game.keyControl.onKeyUp(_Keys.KEY_MAP.TURN_CLOCKWISE, function () {
	        return _this2.turningCW = false;
	      });
	      this.game.keyControl.onKeyUp(_Keys.KEY_MAP.TURN_COUNTERCLOCKWISE, function () {
	        return _this2.turningCCW = false;
	      });
	    }
	  }, {
	    key: "draw",
	    value: function draw(screen) {
	      screen.save();
	      screen.translate(this.x, this.y);
	      screen.rotate(90 * _Constants.DEGREE);
	      screen.rotate(this.angle);
	
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
	
	      // this.drawBoundingBox(screen);
	    }
	  }, {
	    key: "collide",
	    value: function collide(collidedWith) {
	      // console.log(this.constructor.name + " collided with " + collidedWith.constructor.name);
	    }
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
	      this.x += this.dx;
	      this.y += this.dy;
	    }
	  }, {
	    key: "wrapAroundWorld",
	    value: function wrapAroundWorld() {
	      var cw = this.game.canvas.getAttribute("width");
	      var ch = this.game.canvas.getAttribute("height");
	      if (this.x < 0) {
	        this.x = cw - this.x;
	      } else if (this.x > cw) {
	        this.x = this.x - cw;
	      }
	      if (this.y < 0) {
	        this.y = ch - this.y;
	      } else if (this.y > ch) {
	        this.y = this.y - ch;
	      }
	    }
	  }, {
	    key: "calculateNewAngle",
	    value: function calculateNewAngle() {
	      if (this.turningCCW) {
	        this.angle -= this.turnSpeed;
	      }
	      if (this.turningCW) {
	        this.angle += this.turnSpeed;
	      }
	    }
	  }, {
	    key: "calculateNewSpeeds",
	    value: function calculateNewSpeeds() {
	      if (this.accelerating) {
	        var accX = Math.cos(this.angle) * this.acceleration;
	        this.dx = this.dx + accX;
	
	        var accY = Math.sin(this.angle) * this.acceleration;
	        this.dy = this.dy + accY;
	      }
	
	      var breakX = Math.cos(this.movementAngleRadians) * this.drag;
	      this.dx = this.dx - breakX;
	
	      var breakY = Math.sin(this.movementAngleRadians) * this.drag;
	      this.dy = this.dy - breakY;
	
	      if (this.speed < 0.15) {
	        this.dx = 0;
	        this.dy = 0;
	      }
	    }
	  }, {
	    key: "globalAngle",
	    get: function get() {
	      return this.angle;
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
	      return this.x;
	    }
	  }, {
	    key: "globalY",
	    get: function get() {
	      return this.y;
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
	    key: "modules",
	    get: function get() {
	      return [].concat.apply([], this._modules).filter(function (p) {
	        return p != undefined;
	      });
	    }
	  }, {
	    key: "movementAngleRadians",
	    get: function get() {
	      var radians = Math.atan2(this.dy, this.dx);
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
	      var fluidDensity = 0.5;
	      var frontalArea = this.mass;
	      var speed = Math.sqrt(Math.pow(this.dx, 2) + Math.pow(this.dy, 2));
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
	      return this.turnPower / this.mass * _Constants.DEGREE;
	    }
	  }, {
	    key: "speed",
	    get: function get() {
	      return Math.sqrt(Math.pow(this.dx, 2) + Math.pow(this.dy, 2));
	    }
	  }]);
	
	  return ControllableShip;
	}(_Sprite3.default);
	
	exports.default = ControllableShip;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Utils = __webpack_require__(7);
	
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
	    key: "drawBoundingBox",
	    value: function drawBoundingBox(screen) {
	      var bbox = (0, _Utils.boundingBox)(this);
	      screen.beginPath();
	      bbox.points.forEach(function (p) {
	        screen.lineTo(p.x, p.y);
	      });
	      screen.closePath();
	      screen.strokeStyle = "orange";
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
	    key: "collide",
	    get: function get() {
	      throw "Unimplemented collide in " + this.constructor.name;
	    }
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
	  }]);
	
	  return Sprite;
	}();
	
	exports.default = Sprite;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.boundingBox = boundingBox;
	exports.isSpritesColliding = isSpritesColliding;
	
	var _sat = __webpack_require__(8);
	
	var _sat2 = _interopRequireDefault(_sat);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
	
	  var bb1 = boundingBox(s1);
	  var bb2 = boundingBox(s2);
	
	  return _sat2.default.testPolygonPolygon(bb1, bb2);
	}

/***/ },
/* 8 */
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
	  if ("function" === 'function' && __webpack_require__(10)['amd']) {
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)(module)))

/***/ },
/* 9 */
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
/* 10 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgaGVpZ2h0PSI0MjQuNTYyMzUiCiAgIGlkPSJMYXllcl8xIgogICB2ZXJzaW9uPSIxLjIiCiAgIHZpZXdCb3g9IjAgMCA1MjUuMzk0MDQgNDI0LjU2MjM1IgogICB3aWR0aD0iNTI1LjM5NDA0IgogICB4bWw6c3BhY2U9InByZXNlcnZlIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkxIHIxMzcyNSIKICAgc29kaXBvZGk6ZG9jbmFtZT0iZmFsY29uLnN2ZyI+PG1ldGFkYXRhCiAgICAgaWQ9Im1ldGFkYXRhMzM0NyI+PHJkZjpSREY+PGNjOldvcmsKICAgICAgICAgcmRmOmFib3V0PSIiPjxkYzpmb3JtYXQ+aW1hZ2Uvc3ZnK3htbDwvZGM6Zm9ybWF0PjxkYzp0eXBlCiAgICAgICAgICAgcmRmOnJlc291cmNlPSJodHRwOi8vcHVybC5vcmcvZGMvZGNtaXR5cGUvU3RpbGxJbWFnZSIgLz48ZGM6dGl0bGU+PC9kYzp0aXRsZT48L2NjOldvcms+PC9yZGY6UkRGPjwvbWV0YWRhdGE+PGRlZnMKICAgICBpZD0iZGVmczMzNDUiIC8+PHNvZGlwb2RpOm5hbWVkdmlldwogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICBib3JkZXJvcGFjaXR5PSIxIgogICAgIG9iamVjdHRvbGVyYW5jZT0iMTAiCiAgICAgZ3JpZHRvbGVyYW5jZT0iMTAiCiAgICAgZ3VpZGV0b2xlcmFuY2U9IjEwIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwIgogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIyNTYwIgogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjEzNzciCiAgICAgaWQ9Im5hbWVkdmlldzMzNDMiCiAgICAgc2hvd2dyaWQ9ImZhbHNlIgogICAgIGlua3NjYXBlOnpvb209IjAuODM0MTY1MDMiCiAgICAgaW5rc2NhcGU6Y3g9IjQwNC4xMjYwOCIKICAgICBpbmtzY2FwZTpjeT0iMTMuNjI5OTk1IgogICAgIGlua3NjYXBlOndpbmRvdy14PSItOCIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iLTgiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJMYXllcl8xIgogICAgIGZpdC1tYXJnaW4tdG9wPSIwIgogICAgIGZpdC1tYXJnaW4tbGVmdD0iMCIKICAgICBmaXQtbWFyZ2luLXJpZ2h0PSIwIgogICAgIGZpdC1tYXJnaW4tYm90dG9tPSIwIiAvPjxnCiAgICAgaWQ9ImczMzQ5IgogICAgIHRyYW5zZm9ybT0ibWF0cml4KC0wLjgzNTYxMDc5LDAuNTQ5MzIxOTUsLTAuNTQ5MzIxOTUsLTAuODM1NjEwNzksNjMyLjU4MDM5LDI5Mi4yNDM1NSkiPjxwYXRoCiAgICAgICBpZD0icGF0aDMzMzciCiAgICAgICBkPSJNIDE5OS4xMDEsODMuMjY2IDI0NC41OTYsNy4yNzcgYyAtNS4zNDQsLTIuMzA2IC0xMS4wMTcsLTMuOTY2IC0xNy4yMDEsLTMuOTY2IC0yNC45NDQsMCAtNDUuMTY2LDIwLjIyMiAtNDUuMTY2LDQ1LjE2IDAsMTQuMTMzIDYuNjkzLDI2LjUyOSAxNi44NzIsMzQuNzk1IgogICAgICAgaW5rc2NhcGU6Y29ubmVjdG9yLWN1cnZhdHVyZT0iMCIgLz48cGF0aAogICAgICAgaWQ9InBhdGgzMzM5IgogICAgICAgZD0ibSA1MDcuNzksMzA3LjkyNCAtMTIuMTA4LC04LjA4NCBjIC0yLjM0NywtMzkuMzIzIC0xNi4zOTEsLTc3LjY2NyAtNDEuMTU5LC0xMDkuMzkzIGwgLTMxLjY2OCw0LjA3MSAyLjE5NCwtMy4yNzkgYyA4LjI2LC0xMi4zNjcgNC44OTMsLTI5LjIzMyAtNy40NjIsLTM3LjQ5OSBsIC0xNy42NTgsLTExLjc4NiBjIC0xMi4zNTUsLTguMjU0IC0yOS4yMjgsLTQuODkzIC0zNy40ODcsNy40NzQgbCAtMi40ODcsMy43MTMgLTE0LjA1NywtODQuMTAxIC04NS40NywtNTMuMTIyIC00NS44MzUsNzYuNTU4IDIyLjQ4LDEyLjU1NCAtMTYzLjE0NiwtMjAuNjczIC0yMy42MDcsMzUuMzM0IDk4LjQxLDY1LjczNCBjIC00LjQzNSw1LjMyMSAtOC43MTEsMTAuODI0IC0xMi42NDIsMTYuNzA4IC0zLjkyNSw1Ljg5IC03LjM3NCwxMS45NDQgLTEwLjU5NSwxOC4wNzUgbCAtOTguMzk5LC02NS43MzQgLTIzLjYwNiwzNS4zNDUgMTI3LjQ2MSwyMjMuMDY4IDAuMjE3LC0wLjM1MyBjIDIuNTU4LDQuMjcxIDUuMzkxLDguNDAxIDguMjc3LDEyLjUyIGwgNDIuNTQ0LC01LjQ2OCAtNy45MDgsMTEuODE1IGMgLTguMjU0LDEyLjM2NiAtNC44ODcsMjkuMjM4IDcuNDc0LDM3LjQ5OCBsIDE3LjY1MiwxMS43OTIgYyAxMi4zNjEsOC4yNDggMjkuMjI3LDQuOTA0IDM3LjQ4MSwtNy40NjIgbCA2LjYsLTkuODY4IDQuODQsMzcuNjYzIGMgMzcuMDUzLDEwLjA2NyA3NS44NzcsOC43MjkgMTExLjY1MSwtMi43NDUgbCAxNC40NDMsOS42NDUgYyAzOS40OTMsLTEzLjkzOCA3NC45NzQsLTQwLjI5MSAxMDAuMDM1LC03Ny43OSAyNS4wNjMsLTM3LjUxIDM1LjgxMSwtODAuMzk0IDMzLjUzNSwtMTIyLjIxIE0gMzYyLjY1Miw0MTMuODI2IGMgLTIuNzY5LDQuMTQyIC04LjM1NCw1LjI0NCAtMTIuNDk1LDIuNDg3IC00LjE0MiwtMi43NyAtNS4yNDUsLTguMzU0IC0yLjQ4NywtMTIuNTA4IDIuNzU3LC00LjEzIDguMzY1LC01LjI0NCAxMi40OTUsLTIuNDg3IDQuMTQyLDIuNzcgNS4yNTcsOC4zNjcgMi40ODcsMTIuNTA4IG0gLTMuMTQ0LC02Mi40NjcgYyAtMTMuMzk4LDIwLjA3NSAtMzUuODMyLDMyLjA2NiAtNTkuOTc5LDMyLjA2NiAtMTQuMjc5LDAgLTI4LjA4OSwtNC4yMTIgLTM5Ljk5OCwtMTIuMTY3IC0zMy4wNTgsLTIyLjA1OSAtNDEuOTY5LC02Ni45MDEgLTE5LjkxMSwtOTkuOTU0IDEzLjQxMSwtMjAuMDkyIDM1LjgzMywtMzIuMDY2IDYwLjAxNCwtMzIuMDY2IDE0LjI1NiwwIDI4LjA2NSw0LjIwMSAzOS45NzUsMTIuMTMyIDMzLjA0LDIyLjA5NCA0MS45NTcsNjYuOTYxIDE5Ljg5OSw5OS45ODkgbSAyOC42MjksOTkuNjE0IGMgLTIuNzU3LDQuMTMgLTguMzU0LDUuMjQ1IC0xMi40ODMsMi40ODcgLTQuMTU0LC0yLjc2OSAtNS4yNTcsLTguMzY1IC0yLjQ4NywtMTIuNTA3IDIuNzY5LC00LjEzMSA4LjM1NCwtNS4yNDUgMTIuNDgzLC0yLjQ3NyA0LjE0MSwyLjc1OCA1LjI1Niw4LjM0MyAyLjQ4NywxMi40OTcgbSA3LjAxNiwtNzAuNzUgYyAtMi43NTgsNC4xMyAtOC4zNDMsNS4yNDUgLTEyLjQ4NCwyLjQ4NyAtNC4xMywtMi43NjkgLTUuMjU2LC04LjM3NyAtMi40ODcsLTEyLjUwNyAyLjc3LC00LjE0MyA4LjM1NCwtNS4yNTcgMTIuNDg0LC0yLjQ4OCA0LjE1MywyLjc2OSA1LjI1Niw4LjM1NCAyLjQ4NywxMi41MDggbSA2LjExMywtNDAuNDMyIGMgLTQuMTQyLC0yLjc1OCAtNS4yNDQsLTguMzU0IC0yLjQ4NywtMTIuNTA4IDIuNzU4LC00LjEzIDguMzY2LC01LjI0NCAxMi41MDgsLTIuNDg3IDQuMTMsMi43NjkgNS4yNDQsOC4zNzcgMi40ODcsMTIuNTA4IC0yLjc1Nyw0LjE0MSAtOC4zNjYsNS4yNTYgLTEyLjUwOCwyLjQ4NyBtIDI4LjY3NSw2My42NTEgYyAtMi43NTcsNC4xNDIgLTguMzQyLDUuMjQ0IC0xMi40OTUsMi40NzYgLTQuMTMxLC0yLjc1NyAtNS4yNTcsLTguMzQyIC0yLjQ4NywtMTIuNDg0IDIuNzY5LC00LjEzIDguMzY1LC01LjI1NiAxMi40OTUsLTIuNDg3IDQuMTQyLDIuNzY5IDUuMjQ1LDguMzU0IDIuNDg3LDEyLjQ5NSBtIDI3LjkwMiwtNTYuODIzIGMgLTIuNzU4LDQuMTUzIC04LjM2Niw1LjI1NyAtMTIuNDk2LDIuNDg3IC00LjE1MywtMi43NjkgLTUuMjU2LC04LjM1NCAtMi40ODcsLTEyLjQ4MyAyLjc3LC00LjE0MiA4LjM1NCwtNS4yNTcgMTIuNDk2LC0yLjQ4NyA0LjEyOSwyLjc1NyA1LjI0NCw4LjM1MyAyLjQ4NywxMi40ODMiCiAgICAgICBpbmtzY2FwZTpjb25uZWN0b3ItY3VydmF0dXJlPSIwIiAvPjxwYXRoCiAgICAgICBpZD0icGF0aDMzNDEiCiAgICAgICBkPSJtIDMyOS41ODksMjY2LjM3MSBjIC04LjkyOSwtNS45NzIgLTE5LjI4OSwtOS4xMjIgLTI5Ljk1NCwtOS4xMjIgLTE4LjE1MSwwIC0zNC45NzcsOC45OTkgLTQ1LjAyLDI0LjA0MSAtMTYuNTU1LDI0LjgwNCAtOS44NSw1OC40MzEgMTQuOTI1LDc0Ljk3NCA4LjkxNyw1Ljk3MyAxOS4yODksOS4xNDEgMjkuOTY2LDkuMTQxIDE4LjEzOSwwIDM0Ljk2NCwtOSA0NS4wMDgsLTI0LjA0MSAxNi41NjYsLTI0LjgwNCA5Ljg1NSwtNTguNDMxIC0xNC45MjUsLTc0Ljk5MyIKICAgICAgIGlua3NjYXBlOmNvbm5lY3Rvci1jdXJ2YXR1cmU9IjAiIC8+PC9nPjwvc3ZnPg=="

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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MASS = 5;
	var ENGINE_POWER = 100;
	var TURN_POWER = 5;
	var COST = 50;
	var HITPOINTS = 5;
	var POWER_GENERATION = 0;
	
	var Engine = function (_ShipModule) {
	  _inherits(Engine, _ShipModule);
	
	  function Engine(ship, x, y) {
	    _classCallCheck(this, Engine);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Engine).call(this, ship, x, y, MASS, ENGINE_POWER, TURN_POWER, COST, HITPOINTS, POWER_GENERATION, _Constants.BLOCK_SIZE, _Constants.BLOCK_SIZE));
	  }
	
	  _createClass(Engine, [{
	    key: "draw",
	    value: function draw(screen) {
	      screen.save();
	      screen.translate(this.x, this.y);
	
	      screen.fillStyle = "#00aa00";
	      screen.beginPath();
	      screen.lineTo(0, 0);
	      screen.lineTo(_Constants.BLOCK_SIZE, 0);
	      screen.lineTo(_Constants.BLOCK_SIZE, _Constants.BLOCK_SIZE / 2);
	      screen.lineTo(_Constants.BLOCK_SIZE / 2, _Constants.BLOCK_SIZE);
	      screen.lineTo(0, _Constants.BLOCK_SIZE / 2);
	      screen.closePath();
	      screen.fill();
	
	      screen.restore();
	
	      // var newScreen = screen.canvas.getContext('2d');
	      // newScreen.restore();
	      // this.drawBoundingBox(newScreen);
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
	
	var _sat = __webpack_require__(8);
	
	var _sat2 = _interopRequireDefault(_sat);
	
	var _Sprite2 = __webpack_require__(6);
	
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
	      console.log(this.constructor.name + " destroyed!");
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
	var BLOCK_SIZE = exports.BLOCK_SIZE = 10;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ShipModule2 = __webpack_require__(13);
	
	var _ShipModule3 = _interopRequireDefault(_ShipModule2);
	
	var _Constants = __webpack_require__(14);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var x;
	var y;
	
	var MASS = 1;
	var ENGINE_POWER = 1;
	var TURN_POWER = 5;
	var COST = 0;
	var HITPOINTS = 5;
	var POWER_GENERATION = 1;
	
	var Core = function (_ShipModule) {
	  _inherits(Core, _ShipModule);
	
	  function Core(ship, x, y) {
	    _classCallCheck(this, Core);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Core).call(this, ship, x, y, MASS, ENGINE_POWER, TURN_POWER, COST, HITPOINTS, POWER_GENERATION));
	  }
	
	  _createClass(Core, [{
	    key: "draw",
	    value: function draw(screen) {
	      screen.save();
	      screen.translate(this.x, this.y);
	      screen.fillStyle = "#666666";
	      screen.fillRect(0, 0, _Constants.BLOCK_SIZE, _Constants.BLOCK_SIZE);
	
	      screen.fillStyle = "#ff3300";
	      screen.beginPath();
	      screen.arc(_Constants.BLOCK_SIZE / 2, _Constants.BLOCK_SIZE / 2, _Constants.BLOCK_SIZE / 3, 0, 2 * Math.PI);
	      screen.closePath();
	      screen.fill();
	
	      screen.restore();
	    }
	  }]);
	
	  return Core;
	}(_ShipModule3.default);
	
	exports.default = Core;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ShipModule2 = __webpack_require__(13);
	
	var _ShipModule3 = _interopRequireDefault(_ShipModule2);
	
	var _Constants = __webpack_require__(14);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MASS = 100;
	var ENGINE_POWER = 0;
	var TURN_POWER = 0;
	var COST = 5;
	var HITPOINTS = 50;
	var POWER_GENERATION = 0;
	
	var Armor = function (_ShipModule) {
	  _inherits(Armor, _ShipModule);
	
	  function Armor(ship, x, y) {
	    _classCallCheck(this, Armor);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Armor).call(this, ship, x, y, MASS, ENGINE_POWER, TURN_POWER, COST, HITPOINTS, POWER_GENERATION));
	  }
	
	  _createClass(Armor, [{
	    key: "draw",
	    value: function draw(screen) {
	      screen.save();
	      screen.translate(this.x, this.y);
	      screen.fillStyle = "#999999";
	      screen.fillRect(0, 0, _Constants.BLOCK_SIZE, _Constants.BLOCK_SIZE);
	      screen.restore();
	    }
	  }]);
	
	  return Armor;
	}(_ShipModule3.default);
	
	exports.default = Armor;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _ShipModule2 = __webpack_require__(13);
	
	var _ShipModule3 = _interopRequireDefault(_ShipModule2);
	
	var _Constants = __webpack_require__(14);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MASS = 15;
	var ENGINE_POWER = 0;
	var TURN_POWER = 350;
	var COST = 5;
	var HITPOINTS = 10;
	var POWER_GENERATION = 0;
	
	var _isOnLeftSide;
	
	var Wing = function (_ShipModule) {
	  _inherits(Wing, _ShipModule);
	
	  function Wing(ship, isOnLeftSide, x, y) {
	    _classCallCheck(this, Wing);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Wing).call(this, ship, x, y, MASS, ENGINE_POWER, TURN_POWER, COST, HITPOINTS, POWER_GENERATION, _Constants.BLOCK_SIZE, _Constants.BLOCK_SIZE));
	
	    _isOnLeftSide = isOnLeftSide;
	    return _this;
	  }
	
	  _createClass(Wing, [{
	    key: "draw",
	    value: function draw(screen) {
	      screen.save();
	      screen.translate(this.x, this.y);
	
	      screen.fillStyle = "#0066ff";
	      screen.fillRect(0, 0, _Constants.BLOCK_SIZE, _Constants.BLOCK_SIZE);
	
	      screen.restore();
	    }
	  }]);
	
	  return Wing;
	}(_ShipModule3.default);
	
	exports.default = Wing;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Constants = __webpack_require__(14);
	
	var _ShipModule2 = __webpack_require__(13);
	
	var _ShipModule3 = _interopRequireDefault(_ShipModule2);
	
	var _Bullet = __webpack_require__(19);
	
	var _Bullet2 = _interopRequireDefault(_Bullet);
	
	var _Keys = __webpack_require__(20);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var MASS = 25;
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
	
	    _this.firingRate = 5;
	    _this.timeToNextFire = 0;
	
	    _this.shooting = false;
	    _this.game.keyControl.onKeyDown(_Keys.KEY_MAP.SPACE, function () {
	      return _this.shooting = true;
	    });
	    _this.game.keyControl.onKeyUp(_Keys.KEY_MAP.SPACE, function () {
	      return _this.shooting = false;
	    });
	    return _this;
	  }
	
	  _createClass(Gun, [{
	    key: "draw",
	    value: function draw(screen) {
	      screen.save();
	      screen.translate(this.x, this.y);
	
	      screen.fillStyle = "#333333";
	      screen.beginPath();
	
	      screen.lineTo(_Constants.BLOCK_SIZE, _Constants.BLOCK_SIZE);
	      screen.lineTo(0, _Constants.BLOCK_SIZE);
	      screen.lineTo(0, _Constants.BLOCK_SIZE * 0.3);
	
	      screen.lineTo(_Constants.BLOCK_SIZE * 0.3, _Constants.BLOCK_SIZE * 0.3);
	      screen.lineTo(_Constants.BLOCK_SIZE * 0.3, 0);
	      screen.lineTo(_Constants.BLOCK_SIZE * 0.7, 0);
	      screen.lineTo(_Constants.BLOCK_SIZE * 0.7, _Constants.BLOCK_SIZE * 0.3);
	
	      screen.lineTo(_Constants.BLOCK_SIZE, _Constants.BLOCK_SIZE * 0.3);
	
	      screen.closePath();
	      screen.fill();
	
	      screen.restore();
	    }
	  }, {
	    key: "tick",
	    value: function tick() {
	      if (this.shooting && this.timeToNextFire-- == 0) {
	        this.timeToNextFire = this.firingRate;
	        this.game.spawn(new (Function.prototype.bind.apply(_Bullet2.default, [null].concat([this], _toConsumableArray(this.worldPos), [this.ship.angle])))(), "SHOTS");
	      }
	    }
	  }]);
	
	  return Gun;
	}(_ShipModule3.default);
	
	exports.default = Gun;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Sprite2 = __webpack_require__(6);
	
	var _Sprite3 = _interopRequireDefault(_Sprite2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DEGREE = Math.PI / 180;
	
	var x, y, gun;
	
	var Bullet = function (_Sprite) {
	  _inherits(Bullet, _Sprite);
	
	  function Bullet(gun, x, y, angle) {
	    _classCallCheck(this, Bullet);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Bullet).call(this));
	
	    _this.gun = gun;
	    _this.x = x;
	    _this.y = y;
	    _this.speed = 3;
	    _this.angle = angle;
	    _this.age = 0;
	
	    _this.damage = 5;
	
	    _this.dx = Math.cos(_this.angle) * _this.speed;
	    _this.dy = Math.sin(_this.angle) * _this.speed;
	    return _this;
	  }
	
	  _createClass(Bullet, [{
	    key: "tick",
	    value: function tick() {
	      this.age++;
	      this.x += this.dx;
	      this.y += this.dy;
	
	      if (this.age > 100) {
	        this.die();
	      }
	
	      this.wrapAroundWorld();
	    }
	  }, {
	    key: "die",
	    value: function die() {
	      this.gun.game.removeShot(this);
	    }
	  }, {
	    key: "draw",
	    value: function draw(screen) {
	
	      screen.save();
	      screen.translate(this.x, this.y);
	      screen.rotate(90 * DEGREE);
	      screen.rotate(this.angle);
	
	      screen.beginPath();
	      screen.lineTo(-1, 0);
	      screen.lineTo(-1, -3);
	      screen.lineTo(0, -5);
	      screen.lineTo(1, -3);
	      screen.lineTo(1, 0);
	
	      screen.closePath();
	      screen.fillStyle = "red";
	      screen.fill();
	
	      screen.restore();
	    }
	  }, {
	    key: "wrapAroundWorld",
	    value: function wrapAroundWorld() {
	      var cw = this.gun.game.canvas.getAttribute("width");
	      var ch = this.gun.game.canvas.getAttribute("height");
	      if (this.x < 0) {
	        this.x = cw - this.x;
	      } else if (this.x > cw) {
	        this.x = this.x - cw;
	      }
	      if (this.y < 0) {
	        this.y = ch - this.y;
	      } else if (this.y > ch) {
	        this.y = this.y - ch;
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
	      return this.x;
	    }
	  }, {
	    key: "globalY",
	    get: function get() {
	      return this.y;
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
/* 20 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var KEY_MAP = exports.KEY_MAP = {
	  SHIFT: 16, //SHIFT KEY,
	  SPACE: 32, //SHIFT KEY,
	  ACCELERATE: 87, //W
	  TURN_COUNTERCLOCKWISE: 65, //S
	  TURN_CLOCKWISE: 68 //D,
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _falcon = __webpack_require__(11);
	
	var _falcon2 = _interopRequireDefault(_falcon);
	
	var _Engine = __webpack_require__(12);
	
	var _Engine2 = _interopRequireDefault(_Engine);
	
	var _Core = __webpack_require__(15);
	
	var _Core2 = _interopRequireDefault(_Core);
	
	var _Armor = __webpack_require__(16);
	
	var _Armor2 = _interopRequireDefault(_Armor);
	
	var _Wing = __webpack_require__(17);
	
	var _Wing2 = _interopRequireDefault(_Wing);
	
	var _Gun = __webpack_require__(18);
	
	var _Gun2 = _interopRequireDefault(_Gun);
	
	var _Utils = __webpack_require__(7);
	
	var _Constants = __webpack_require__(14);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SHIP_SCHEMATIC = ["SGS", "WXW", " E "];
	
	var DummyShip = function () {
	  function DummyShip(game) {
	    _classCallCheck(this, DummyShip);
	
	    this.game = game;
	    this.x = 200;
	    this.y = 200;
	    this.pivotX = 21;
	    this.pivotY = 23;
	
	    this.width = 30;
	    this.height = 30;
	
	    this.mass = 0;
	
	    this.dx = 0;
	    this.dy = 0;
	    this.enginePower = 0;
	
	    this.angle = 60;
	    this.turnPower = 0;
	
	    this.cost = 0;
	
	    this.turningCCW = true;
	    this.turningCW = false;
	    this.accelerating = true;
	
	    this.img = new Image();
	    this.img.src = _falcon2.default;
	
	    this.loadParts();
	  }
	
	  _createClass(DummyShip, [{
	    key: "loadParts",
	    value: function loadParts() {
	      this._modules = [];
	
	      for (var row = 0; row < SHIP_SCHEMATIC.length; row++) {
	        var y = row * _Constants.BLOCK_SIZE;
	
	        var partsRow = [];
	        this._modules.push(partsRow);
	        var positions = SHIP_SCHEMATIC[row].split("");
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
	            gun.shooting = true;
	            partsRow.push(gun);
	          } else if (block === "W") {
	            partsRow.push(new _Wing2.default(this, true, x, y));
	          } else if (block === "X") {
	            this.pivotX = pos * _Constants.BLOCK_SIZE + _Constants.BLOCK_SIZE / 2;
	            this.pivotY = row * _Constants.BLOCK_SIZE + _Constants.BLOCK_SIZE / 2;
	            partsRow.push(new _Core2.default(this, x, y));
	          } else {
	            partsRow.push(undefined);
	          }
	        }
	      }
	
	      this.recalculateAggregateProperties();
	    }
	  }, {
	    key: "recalculateAggregateProperties",
	    value: function recalculateAggregateProperties() {
	      var allParts = [].concat.apply([], this._modules).filter(function (p) {
	        return p != undefined;
	      });
	
	      this.mass = allParts.map(function (p) {
	        return p.mass;
	      }).reduce(function (a, b) {
	        return a + b;
	      }, 0);
	      this.enginePower = allParts.map(function (p) {
	        return p.enginePower;
	      }).reduce(function (a, b) {
	        return a + b;
	      }, 0);
	      this.turnPower = allParts.map(function (p) {
	        return p.turnPower;
	      }).reduce(function (a, b) {
	        return a + b;
	      }, 0);
	      this.cost = allParts.map(function (p) {
	        return p.cost;
	      }).reduce(function (a, b) {
	        return a + b;
	      }, 0);
	
	      this.modulesThatTick = allParts.filter(function (p) {
	        return p.tick != undefined;
	      });
	    }
	  }, {
	    key: "draw",
	    value: function draw(screen) {
	      screen.save();
	      screen.translate(this.x, this.y);
	      screen.rotate(90 * _Constants.DEGREE);
	      screen.rotate(this.angle);
	
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
	
	      // this.drawBoundingBox(screen);
	    }
	  }, {
	    key: "collide",
	    value: function collide(collidedWith) {
	      // console.log(this.constructor.name + " collided with " + collidedWith.constructor.name);
	    }
	  }, {
	    key: "drawBoundingBox",
	    value: function drawBoundingBox(screen) {
	      var bbox = (0, _Utils.boundingBox)(this);
	      screen.beginPath();
	      bbox.points.forEach(function (p) {
	        screen.lineTo(p.x, p.y);
	      });
	      screen.closePath();
	      screen.strokeStyle = "orange";
	      screen.stroke();
	    }
	  }, {
	    key: "tickModules",
	    value: function tickModules() {
	      this.modulesThatTick.forEach(function (m) {
	        return m.tick();
	      });
	    }
	  }, {
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
	      this.x += this.dx;
	      this.y += this.dy;
	    }
	  }, {
	    key: "wrapAroundWorld",
	    value: function wrapAroundWorld() {
	      var cw = this.game.canvas.getAttribute("width");
	      var ch = this.game.canvas.getAttribute("height");
	      if (this.x < 0) {
	        this.x = cw - this.x;
	      } else if (this.x > cw) {
	        this.x = this.x - cw;
	      }
	      if (this.y < 0) {
	        this.y = ch - this.y;
	      } else if (this.y > ch) {
	        this.y = this.y - ch;
	      }
	    }
	  }, {
	    key: "calculateNewAngle",
	    value: function calculateNewAngle() {
	      if (this.turningCCW) {
	        this.angle -= this.turnSpeed;
	      }
	      if (this.turningCW) {
	        this.angle += this.turnSpeed;
	      }
	    }
	  }, {
	    key: "calculateNewSpeeds",
	    value: function calculateNewSpeeds() {
	      if (this.accelerating) {
	        var accX = Math.cos(this.angle) * this.acceleration;
	        this.dx = this.dx + accX;
	
	        var accY = Math.sin(this.angle) * this.acceleration;
	        this.dy = this.dy + accY;
	      }
	
	      var breakX = Math.cos(this.movementAngleRadians) * this.drag;
	      this.dx = this.dx - breakX;
	
	      var breakY = Math.sin(this.movementAngleRadians) * this.drag;
	      this.dy = this.dy - breakY;
	
	      if (this.speed < 0.15) {
	        this.dx = 0;
	        this.dy = 0;
	      }
	    }
	  }, {
	    key: "globalAngle",
	    get: function get() {
	      return this.angle;
	    }
	  }, {
	    key: "movementAngleRadians",
	    get: function get() {
	      var radians = Math.atan2(this.dy, this.dx);
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
	      var fluidDensity = 0.5;
	      var frontalArea = this.mass;
	      var speed = Math.sqrt(Math.pow(this.dx, 2) + Math.pow(this.dy, 2));
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
	      return this.turnPower / this.mass * _Constants.DEGREE;
	    }
	  }, {
	    key: "speed",
	    get: function get() {
	      return Math.sqrt(Math.pow(this.dx, 2) + Math.pow(this.dy, 2));
	    }
	  }, {
	    key: "globalX",
	    get: function get() {
	      return this.x;
	    }
	  }, {
	    key: "globalY",
	    get: function get() {
	      return this.y;
	    }
	  }, {
	    key: "modules",
	    get: function get() {
	      return [].concat.apply([], this._modules).filter(function (p) {
	        return p != undefined;
	      });
	    }
	  }]);
	
	  return DummyShip;
	}();
	
	exports.default = DummyShip;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map