export const s = p => {
    
    p.setup = function() {
      p.createCanvas(300, 300);
    };
  
    p.draw = function() {
        p.background(255);
        p.ellipse(150, 150, 40);
        p.stroke(0);
    };
  };