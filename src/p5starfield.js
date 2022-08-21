export const s = p => {
    class star{
        constructor(){
            this.x = p.random(-p.width, p.width);
            this.y = p.random(-p.height, p.height);
            this.z = p.random(0, p.width);
        }
        show(){
            p.fill(255);
            p.noStroke();
            let sx = p.map(this.x / this.z, 0, 1, 0, p.width);
            let sy = p.map(this.y / this.z, 0, 1, 0, p.height);
            let r = p.map(this.z, 0, p.width, 7, 0);
            p.ellipse(sx, sy, r, r);
        }
        update(){
            this.z = this.z - 7;
            if(this.z < 1){
                this.z = p.width;
                this.x = p.random(-p.width, p.width);
                this.y = p.random(-p.height, p.height);
            }
        }
    }
    let stars = [];

    p.setup = function() {
      p.createCanvas(p.windowWidth, p.windowHeight);
        for(let i = 0; i < 400; i++){
            stars.push(new star());
        }
    };
  
    p.draw = function() {
      p.background(0);
      p.fill(255);
      p.translate(p.width/2, p.height/2);
      for(let i = 0; i < 400; i++){
        stars[i].update();
        stars[i].show();
    }

    };

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
  };