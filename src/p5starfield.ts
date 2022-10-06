
export const s = (p:any):any => {
    class star{

        x: number;
        y: number;
        z: number;

        constructor(){
            this.x = p.random(-p.width, p.width);
            this.y = p.random(-p.height, p.height);
            this.z = p.random(p.width);
        }
        show(){
            p.fill(255);
            p.noStroke();
            const sx = p.map(this.x / this.z, 0, 1, 0, p.width);
            const sy = p.map(this.y / this.z, 0, 1, 0, p.height);
            const r = p.map(this.z, 0, p.width, 7, 0);
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
    const stars:star[] = [];

    p.setup = function() {
      p.createCanvas(p.windowWidth, p.windowHeight);
        for(let i = 0; i < 400; i++){
            stars[i] = new star();
        }
    };
  
    p.draw = function() {
        p.background(0);
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