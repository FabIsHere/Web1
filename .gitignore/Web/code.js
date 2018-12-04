function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}


var ol = 
findGetParameter("Num")

// ------

var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var _console = console,log = _console.log;

var internals = {
  config: {
    totalGroups: ol || 50},

  colors: [
  [0x00ffff, 0xff0000],
  [0x00ff00, 0xff00ff],
  [0x0000ff, 0xffff00]] };



internals.w = window.innerWidth;
internals.h = window.innerHeight;

internals.random = function (min, max) {return min + Math.random() * (max - min);};

// -------

internals.app = new PIXI.Application({
  width: internals.w,
  height: internals.h,
  antialias: true,
  resolution: window.devicePixelRatio,
  transparent: false,
  autoResize: true,
  backgroundColor: 0xFFFFFF });


document.body.appendChild(internals.app.view);

// -------
var
Shapes = function () {

  function Shapes(index) {_classCallCheck(this, Shapes);

    this.index = index;
    this.offset = 50;
    this.colorsIndex = 0;

    this.container = new PIXI.Container();
    this.graphicsContainer = new PIXI.Container();
    this.graphicA = new PIXI.Graphics();
    this.graphicA.blendMode = PIXI.BLEND_MODES.MULTIPLY;
    this.graphicB = new PIXI.Graphics();
    this.graphicB.blendMode = PIXI.BLEND_MODES.MULTIPLY;

    this.draw(0);

    this.graphicsContainer.addChild(this.graphicA);
    this.graphicsContainer.addChild(this.graphicB);

    this.container.addChild(this.graphicsContainer);

    this.container.pivot.x = this.getWidth() / 2;
    this.container.pivot.y = this.getHeight() / 2;

    this.reset().animate();
  }_createClass(Shapes, [{ key: 'get', value: function get()

    {

      return this.container;
    } }, { key: 'getWidth', value: function getWidth()

    {

      return this.get().children[0].width;
    } }, { key: 'getHeight', value: function getHeight()

    {

      return this.get().children[0].height;
    } }, { key: 'draw', value: function draw(

    colorsIndex) {

      if (colorsIndex === undefined) {
        this.colorsIndex = ++this.colorsIndex % internals.colors.length;
      }

      var colors = internals.colors[this.colorsIndex];

      if (this.index % 2) {
        this.graphicA.clear();
        this.graphicA.beginFill(colors[0]);
        this.graphicA.drawRect(internals.random(0, this.offset), internals.random(0, this.offset), 60, 60);
        this.graphicA.endFill();

        this.graphicA.beginFill(colors[1]);
        this.graphicA.drawRect(internals.random(0, this.offset), internals.random(0, this.offset), 60, 60);
        this.graphicA.endFill();
      } else
      {
        this.graphicB.clear();
        this.graphicB.beginFill(colors[0]);
        this.graphicB.drawCircle(internals.random(0, this.offset), internals.random(0, this.offset), 30);
        this.graphicB.endFill();

        this.graphicB.beginFill(colors[1]);
        this.graphicB.drawCircle(internals.random(0, this.offset), internals.random(0, this.offset), 30);
        this.graphicB.endFill();
      }

      return this;
    } }, { key: 'animate', value: function animate()

    {var _this = this;

      var positionX = void 0,positionY = void 0;

      var rotation = internals.random(-360, 360);
      var scale = internals.random(0.5, 1.25);
      var delay = this.index * 0.1;

      if (Math.random() > 0.5) {
        positionX = internals.random(0 - this.getWidth(), internals.w + this.getWidth());
        positionY = Math.random() > 0.5 ? internals.h + this.getHeight() : -this.getHeight();
      } else
      {
        positionX = Math.random() > 0.5 ? internals.w + this.getWidth() : -this.getWidth();
        positionY = internals.random(0 - this.getHeight(), internals.h + this.getHeight());
      }

      TweenMax.to(this.get(), internals.random(2, 6), {
        pixi: {
          positionX: positionX,
          positionY: positionY,
          rotation: rotation,
          scale: scale },

        delay: delay,
        onComplete: function onComplete() {

          _this.reset().animate();
        } });


      return this;
    } }, { key: 'reset', value: function reset()

    {

      this.get().scale.set(0);
      this.get().position.set(internals.w / 2, internals.h / 2);
      this.get().rotation = 0;

      return this;
    } }]);return Shapes;}();


// -------

TweenLite.defaultEase = Power0.easeNone;

internals.shapes = [];
for (var i = 0; i < internals.config.totalGroups; i++){
  var s = new Shapes(i);
  internals.shapes.push(s);
  internals.app.stage.addChild(s.get());
}

// -------
//window.CP.exitedLoop(0);
function changeColors() {
  console.log("Not enabled")
}

function resize() {

  setTimeout(function () {

    internals.w = window.innerWidth;
    internals.h = window.innerHeight;
    internals.app.renderer.resize(internals.w, internals.h);
  }, 200);
}

function render() {

  internals.app.renderer.render(internals.app.stage);
}

window.addEventListener('click', changeColors);
window.addEventListener('touchstart', changeColors);
window.addEventListener('resize', resize);
window.addEventListener('orientationchange', resize);
TweenLite.ticker.addEventListener("tick", render);