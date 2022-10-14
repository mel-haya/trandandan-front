import { io } from "socket.io-client";
import { loadScript } from "vue-plugin-load-script";


export const s = (p:any):any => {

  const iio = io("http://127.0.0.1:3000/play");
  
  let windw:number;
  if (window.innerWidth > 1400)
    windw = window.innerWidth - (window.innerWidth - 1400) - 100
  else
    windw = window.innerWidth - 100;
  let oldwindw = windw;
  let windh = (windw * 48) / 100;

  let drmouse = 0;

  iio.emit("connection", windh)

  const DEFAULT  = {name:"hi", w:windh, oldw:oldwindw, mousepos:0}

  let paddle1Y;
  // let gameEnded = false;
  //Paddle Thickness
  const LeftPaddle:number=5;
  const RightPaddle:number=5;
  //X postition of the paddles
  const LeftPaddleX:number = 3;
  let RightPaddleX:number = windw - 7; // don't forgot
  //the length of the paddles
  // let LeftPaddleHeight = 120;
  let LeftPaddleHeight:number = windw / 14;
  let RightPaddleHeight:number = windw / 14;
  //Score of the AI. A.k.A the Number of tries
  // let ComputerScore = 0;

  const ball = {
    x:windw/2,
    y:windh/2,
    r:15,
    dx:6,
    dy:6,
  }

  iio.on('connection', (data) => {
    // socket.on('chat message', (msg) => {
    //   console.log('message: ' + msg);
    // });
    data;
    // iio.emit("somting", {name:"hi", w:windh, oldw:oldwindw})
    DEFAULT.name = "asdasdasdasda"
    iio.emit("somting", {...DEFAULT,oldw:0})
    iio.emit("somting", {...DEFAULT,name:"fasfasfasfas"})
  });

  iio.on('mouse', (data) => {
    drmouse = data.mousepos;
    //drmouse = 1000;
  })


    p.setup = function() {
      p.createCanvas(windw, windh);
    };

    let bmid = windw / (14 * 2)
    let bY = p.mouseY - bmid;
  
    p.draw = function() {
      
      DEFAULT.mousepos = p.mouseY
      DEFAULT.w = windw
      iio.emit("somting", DEFAULT)

      p.clear();
      if (window.innerWidth > 1400)
        windw = window.innerWidth - (window.innerWidth - 1400) - 100
      else
        windw = window.innerWidth - 100;
      windh = (windw * 48) / 100;


      //p.background(40);
      //p.line(0, 0, 0, p.height)

      //paddleInCanvas();
      midline();
      drawScore();
      DifficultyLevel();
      // move();
      
      p.rect(0, 0, 2, windh)
      p.rect(0, windh - 2, windw, 2)
      p.rect(0, 0, windw, 2)
      p.rect(windw - 2, 0, 2, windh)
//      p.rect((windw / 2) - 2, 0, 3, windh)
//      p.ellipse((windw / 2), windh / 2, 2 * (windw / 100) + 2);
      //console.log(15 + (windw / 100))
      
      bY = drmouse;
      // bmid = windw / (14 * 2)
      bmid = (LeftPaddleHeight - 10) / 2
      if (bY > windh - bmid)
        bY = windh - bmid
      else if (bY < bmid)
        bY = bmid
      p.fill(250,250,250);
     // p.rect(0, bY - bmid, windw / 70, windw / 14)
      p.stroke('rgba(132,51,125,0.5)');
      p.strokeWeight(4);
      paddle1Y = bY - bmid;
      p.rect(LeftPaddleX, paddle1Y, LeftPaddle, LeftPaddleHeight - 10);

//to be modify
      //pc computer paddle
      p.fill(250,250,250);
      p.stroke('rgba(132,51,125,0.5)');
      const RightPaddleY = ball.y - RightPaddleHeight / 2;
      p.rect(RightPaddleX, RightPaddleY, RightPaddle, RightPaddleHeight - 10);

//to be removed
      // function paddleInCanvas(){
      //   if(p.mouseY + LeftPaddleHeight - 10 > windh){
      //     p.mouseY = windh - LeftPaddleHeight + 10;
      //   }
      //   if(p.mouseY < 0){
      //     p.mouseY = 0;
      //   }
      // }

      // function reset(){
      //   ball.x = windw/2 + 50;
      //   ball.y = windh/2 + 50;
      //   ball.dx = 6;
      //   ball.dy = 6;
      // }

      function midline(){
        let i = 0
        for(i=0;i<windh;i+=45) {
          //let y = 0;
          p.fill('rgba(172,70,130,1)');
          p.stroke(0);
          p.strokeWeight(0)
          p.rect(windw/2,i,2,30);
          //fill('rgba(132,51,125,0.5)');
          p.rect(0,0,5,windh);
          p.rect(windw - 5, 0, 5, windw);
        }
      }

//to be filled
      function drawScore(){
        // p.textAlign(p.CENTER);
        // p.textSize(20);
        // p.fill(250,250,250);
        // p.stroke(0,0,0)
        // p.text("Number of tries:",3 * windw / 4 ,50)
        // p.text(ComputerScore,3 * windw / 4 + 90,50)
      }

      function  DifficultyLevel(){
        p.fill('rgba(232,190,251,1)');
        if (windw > 700)
          p.textSize(20);
        else
          p.textSize(15);
        //  p.noStroke(23);
        p.text("Difficulty:"+Math.abs(ball.dx),windw / 4,30);
        p.fill('rgba(172,70,130,1)');
      }


      

      if (oldwindw != windw)
      {
        p.resizeCanvas(windw, windh);
        oldwindw = windw
        LeftPaddleHeight = windw / 14;
        RightPaddleHeight = windw / 14;
        RightPaddleX = windw - 7;
        //console.log(windw)
      }
      
      p.strokeWeight(windh / 100);
      
     
      p.cursor(p.CROSS);
      // p.noCursor();
        
    };
};