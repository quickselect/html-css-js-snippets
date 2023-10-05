const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d' , {willReadFrequently:true});
canvas.width = 800;
canvas.height = 450;

const image1 = new Image();
image1.src = `IJ.jpg`;
image1.addEventListener('load', function () {
  test();
});

// requestAnimationFrame
function test() {
  ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);
  const scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
  // console.log(scannedImage);
  const scannedData = scannedImage.data;
  for (let i = 0; i < scannedData.length; i += 4) {
    let value = (Math.random() * 255) | 0;
    scannedData[i] = value;
    scannedData[i + 1] = value;
    scannedData[i + 2] = value;
    scannedData[i + 3] = 25;

    // const total = scannedData[i] + scannedData[i+1]+scannedData[i+2];
    // const averageColorValue = total/3;
    // scannedData[i]= averageColorValue;
    // scannedData[i+1]=averageColorValue;
    // scannedData[i+2]=averageColorValue;
  }
  scannedImage.data = scannedData;
  // scannedImage.fillStyle=ctx.createPattern(64,'repeat');
  ctx.putImageData(scannedImage, 0, 0);
  //  requestAnimationFrame(test());
}

// shim layer with setTimeout fallback
window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

// usage:
// instead of setInterval(render, 16) ....
let frame = 0;
(function animloop() {
  frame++;
  // if (frame % 4 === 0) console.log(frame);
  if (frame % 4 === 0) {
    // console.log(frame);
    test();
  }
  requestAnimFrame(animloop);
  // render();
})();
// place the rAF *before* the render() to assure as close to
// 60fps with the setTimeout fallback.


setInterval(() => {
  frame=0;
  console.log('called');
}, 30000);




// real code on the site
// ===============================
var Grain = (function() {
  function Grain() {
      var _this = this;
      this.frame = 0;
      this.alpha = 0;
      this.settings = {
          patternAlpha: 25,
          patternSize: 64,
      };
      this.loop = function() {
          if (_this.elements && _this.elements.length > 0) {
              _this.frame++;
              if (_this.frame % 4 === 0) {
                  _this.update();
                  _this.elements.forEach(function(el) {
                      if (Project.Scrolling.isVisible(el.canvas)) {
                          el.context.clearRect(0, 0, el.width, el.height);
                          el.context.fillStyle = el.context.createPattern(_this.patternCanvas, 'repeat');
                          el.context.fillRect(0, 0, el.width, el.height);
                      }
                  });
              }
          }
          _this.rAF = requestAnimationFrame(_this.loop);
      }
      ;
      if (Project.breakpoint.desktop) {
          this.init();
          this.loop();
      }
  }
  Grain.prototype.resize = function() {
      if (Project.breakpoint.desktop) {
          if (this.elements && this.elements.length > 0) {
              this.elements.forEach(function(el) {
                  var canvas = el.canvas;
                  canvas.width = canvas.offsetWidth;
                  canvas.height = canvas.offsetHeight;
                  el.width = canvas.width;
                  el.height = canvas.height;
              });
          }
      }
  }
  ;
  Grain.prototype.load = function() {
      this.unload();
      this.build();
      this.resize();
  }
  ;
  Grain.prototype.unload = function() {
      if (this.elements && this.elements.length > 0) {
          this.elements.forEach(function(el) {
              el.canvas = null;
          });
          this.elements = null;
      }
  }
  ;
  Grain.prototype.build = function() {
      var cache = [];
      var elements = document.querySelectorAll('[data-grain]');
      for (var i = 0; i < elements.length; ++i) {
          var element = elements[i];
          var canvas = element.getElementsByTagName('CANVAS')[0];
          if (!canvas) {
              canvas = document.createElement('canvas');
              canvas.className = 'grain';
              element.appendChild(canvas);
          }
          var context = canvas.getContext('2d');
          cache.push({
              canvas: canvas,
              context: context,
          });
      }
      this.elements = cache;
  }
  ;
  Grain.prototype.init = function() {
      this.patternCanvas = document.createElement('canvas');
      this.patternCanvas.width = this.settings.patternSize;
      this.patternCanvas.height = this.settings.patternSize;
      this.patternContext = this.patternCanvas.getContext('2d');
      this.patternData = this.patternContext.createImageData(this.settings.patternSize, this.settings.patternSize);
      this.patternPixelDataLength = this.settings.patternSize * this.settings.patternSize * 4;
  }
  ;
  Grain.prototype.update = function() {
      for (var i = 0; i < this.patternPixelDataLength; i += 4) {
          var value = (Math.random() * 255) | 0;
          this.patternData.data[i] = value;
          this.patternData.data[i + 1] = value;
          this.patternData.data[i + 2] = value;
          this.patternData.data[i + 3] = this.settings.patternAlpha;
      }
      this.patternContext.putImageData(this.patternData, 0, 0);
  }
  ;
  return Grain;
}());