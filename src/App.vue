<template>
  <div></div>
  
</template>

<script>

/* eslint-disable */

export default {
  name: 'App',
  data() {
    return {
      message: ""
    }
  },
  mounted()
  {
    const script = function (p5) {
      var speed = 2;    
      var posX = 0;
      var y = 9;
      // var bg;
      p5.setup = () => { 
      // console.log('Current directory: ' + process.cwd());
      // bg = p5.loadImage('./sunset.jpg');  
      p5.createCanvas(p5.windowWidth, p5.windowHeight);      
      //p5.ellipse(p5.width / 2, p5.height / 2, p5.windowWidth, p5.windowHeight);
      }

      p5.draw = () => {    
        p5.clear();  
        // p5.background(bg)
        const degree = p5.frameCount * 3;      
        const y = (p5.sin(p5.radians(degree * 14 / 14)) + p5.sin(p5.radians(degree * 3 / 3))) * 50;

          
        p5.push();
          p5.translate(0, p5.height / 2);
          p5.ellipse(posX, y, 50, 50);
        p5.pop();
        posX += speed;
            
        if (posX > p5.width || posX < 0) {    
          speed *= -1;      
        }
      }
      p5.windowResized = () => {
        p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
      }
    }
    const P5 = require('p5');
    new P5(script, document.getElementById("p5Canvas"))
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
