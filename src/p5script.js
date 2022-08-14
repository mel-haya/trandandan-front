


export function main(p5) {
  var cols, rows;
  var scl = 50;
  var w = p5.windowWidth;
  var h = p5.windowHeight;
  
  var flying = 0;
  var terrain = [];
    p5.setup = () => { 
        // p5.createCanvas(p5.windowWidth, p5.windowHeight);
        var canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL);
        canvas.style('background', "url('./sunset.jpg') no-repeat center center fixed')")

        cols = w / scl;
        rows = h / scl;
      
        for (var x = 0; x < cols; x++) {
          terrain[x] = [];
          for (var y = 0; y < rows; y++) {
            terrain[x][y] = 0; //specify a default value for now
          }
        }  
  
    }

    p5.draw = () => {    
      
      flying -= 0.025;
      p5.background("");
      var yoff = flying;
      for (var y = 0; y < rows; y++) {
        var xoff = 0;
        for (var x = 0; x < cols; x++) {
          terrain[x][y] = p5.map(p5.noise(xoff, yoff), 0, 1, -150, 150);
          xoff += 0.2;
        }
        yoff += 0.2;
      }


      p5.translate(0, 100);
      p5.rotateX(p5.PI / 3);
      p5.fill(200, 200, 200, 25);
      p5.translate(-w / 2, -h / 2);
      for ( y = 0; y < rows - 1; y++) {
        p5.beginShape(p5.TRIANGLE_STRIP);
        for ( x = 0; x < cols; x++) {
          p5.vertex(x * scl, y * scl, terrain[x][y]);
          p5.vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
        }
        p5.endShape();
  }
    }
    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
    }
}