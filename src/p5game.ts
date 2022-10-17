import { io } from "socket.io-client";
const iio = io("http://127.0.0.1:3000/play");

const s = (p:any):any => {
  
  let windw:number;
  let imgwon:any;
  let imglost:any;
  if (window.innerWidth > 1400)
    windw = window.innerWidth - (window.innerWidth - 1400) - 100
  else
    windw = window.innerWidth - 100;
  let oldwindw = windw;
  let windh = (windw * 48) / 100;

  let variationw = windw / 1300;
  let variationh = windh / 624;
  console.log(variationw + " " + variationh);
  

  let leftmouse = 0;
  let rightmouse = 0;
  let originleftmouse = 0;
  let originrightmouse = 0;
  // console.log(windh)

  const ball = {
    x:windw/2,
    y:windh/2,
    r:15,
    dx:5,
    dy:5,
    p1:0,
    p2:0,
  }
  
  const DEFAULT  = {w:windh, oldw:oldwindw, mousepos:0, room:"", pos:0}
  const BALL = {room:"", ped1:0, ped2:0, ball_data:ball}

  let my_pos:number = 0;
  let my_room:string = "";
  
  let paddle1Y:number;
  const gameEnded = false;
  let gameStart = false;
  let isWon = false;
  let isLost = false;
  // let gameWait = true;
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
  // let ComputerScore:number = 0;
  
  iio.on('fin', (data) => {
    data;
    //console.log("waaaaaaaaa3");
    p.remove();
    iio.off('connection');
    iio.off('take_pos');
    iio.off('mouse');
    iio.off('ball');
    iio.off('reset');
    iio.off('restart');
    iio.off('fin');
    iio.off('done');
    iio.off('won');
    iio.off('lost');
    iio.disconnect();
  });
  
  iio.emit("connection", ball)

  iio.on('connection', (data) => {
    iio.emit("update_mouse", {...DEFAULT,oldw:0})
    // iio.emit("update_mouse", {...DEFAULT,name:"fasfasfasfas"})
    //console.log(data)
    console.log(data)
    if (data === "wait")
      p.noLoop();
    else
    {
      gameStart = true;
      p.loop();
    }
  });

  iio.on('take_pos', (data) => {
    my_pos = data.yourplace;
    my_room = data.room;
    DEFAULT.pos = my_pos;
    DEFAULT.room = my_room;
    BALL.room = my_room;
    console.log(my_pos + " " + my_room);
  });

  iio.on('mouse', (data) => {
    if (data.pos === 1)
    {
      leftmouse = data.mousepos * variationh;
      originleftmouse = data.mousepos;
    }
    else
    {
      rightmouse = data.mousepos * variationh;
      originrightmouse = data.mousepos;
    }
  });

  iio.on('ball', (data) => {
    BALL.ball_data.x = data.x * variationw;
    BALL.ball_data.y = data.y * variationh;
    BALL.ball_data.dx = data.dx;
    BALL.ball_data.dy = data.dy;
  });

  // function reset(){
  //   BALL.ball_data.x = windw/2 + 50;
  //   BALL.ball_data.y = windh/2 + 50;
  //   BALL.ball_data.dx = 6;
  //   BALL.ball_data.dy = 6;
  // }

  iio.on('reset', (data) => {
    //ComputerScore++;
    data;
    p.noLoop();
  });
  
  iio.on('restart', (data) => {
    // data;
    if (iio.id === data.room)
    {
      BALL.ball_data.x = data.x * variationw;
      BALL.ball_data.y = data.y * variationh;
      BALL.ball_data.dx = data.dx;
      BALL.ball_data.dy = data.dy;
      // console.log("abc");
      //reset();
      //BALL.stop = true;
    }
    if (gameStart === true)
      p.loop();
  });
  
  iio.on('done', (data) => {
    p.noLoop();
    console.log(data);
    console.log("you win");
    gameStart = false;
  });
  
  iio.on('won', (data) => {
    data;
    isWon = true;
    p.loop();
  });

  iio.on('lost', (data) => {
    data;
    isLost = true;
    p.loop();
  });




  function midline(){
    let i = 0
    for(i = 0; i < windh; i += 45) {
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
    p.text("Difficulty:" + Math.abs(ball.dx), windw / 4, 30);
    p.fill('rgba(172,70,130,1)');
  }

//!start
  function move(){
    //p.fill(250,250,250);
   // p.stroke('rgba(172,70,130,1)');
    //p.strokeWeight(1);
    p.ellipse(BALL.ball_data.x, BALL.ball_data.y, BALL.ball_data.r, BALL.ball_data.r)
    // ball.x = ball.x + ball.dx;
    // ball.y = ball.y + ball.dy;
    // if(ball.x+ball.r>=width){
    //     ball.dx=-ball.dx-0;  
    // }
      //ellipse(ball.x,ball.y,ball.r,20)
 
   //To make sure tht when the ball hits the paddle it bounces off of the edge of the paddle and it wont go inside the the paddle.
   // if (ball.x-2*ball.r/3< 0 ){
    //TODO:
    // if (ball.x-ball.r < 0 )
    // {
    //   if (ball.y >= paddle1Y && ball.y <= paddle1Y + LeftPaddleHeight) {
    //     ball.dx = -ball.dx + 0; 
    //   }
    //   else
    //   {//if (ball.x-5.5*ball.r/3< 0 ){
    //     ComputerScore++;
    
    //     p.noLoop();
    //     setTimeout(() => {
    //         if (gameEnded == false) {
            
    //         reset();
    //         navigator.vibrate(100);
    //         p.loop();
    //         }
    //     }, 1000);
    //   }
    // }
    //!
    // ball.x = ball.x + ball.dx;
    // ball.y = ball.y + ball.dy;
    // if(ball.x+ball.r >= windw){
    //     ball.dx=-ball.dx-0;  
    // }
    //TODO: 
    // if(ComputerScore ==4){    //This last bit is for the scores and for when you loose it will tell you Gmae Over and Reload the page if you want to play more
    //   p.fill(0,0,0);
    //   gameEnded = true;
    //   p.stroke(0)
    //   p.rect(0, 0, windw, windh - 1);
    //   p.fill(250, 250, 250);
    //   p.stroke(250, 250, 250);
    //   p.textSize(30)
    //   p.text("Game Over!", windw / 2, windh / 2 - 30);
    //   p.textSize(20)
    //   p.text("Reload To Play MOre!", windw / 2, windh / 2)
    //   p.noLoop();
    //   ComputerScore = 0;
    // }
    //!
    // if(ball.y + ball.r > windh || ball.y-ball.r < 0){
    //     ball.dy =- ball.dy;
    // }
    if (gameStart == true)
      iio.emit("ball_move", BALL)
 }
//!end

    
    function preload() {
      imgwon = p.loadImage('https://media.istockphoto.com/vectors/pixel-art-8bit-you-win-text-with-three-winner-golden-cups-on-black-vector-id1268272329?k=20&m=1268272329&s=170667a&w=0&h=79fO42ChPzO8gcIdzngCuag6_Y9ef2dUh1LWpaOkyXo=');
      imglost = p.loadImage('https://elements-video-cover-images-0.imgix.net/files/961bcd50-cb8b-4632-b46c-3abb528c984d/inline_image_preview.jpg?auto=compress&crop=edges&fit=crop&fm=jpeg&h=800&w=1200&s=90f07628b0c40410c1e819e2da97c2b8');
    }




    p.setup = function() {
      p.createCanvas(windw, windh);
      preload();
      if (windw <= 325)
        ball.r = 4;
      else if (windw <= 650)
        ball.r = 7;
      else if (windw <= 975)
        ball.r = 11;
      else
        ball.r = 15;
      // p.imageMode(p.CENTER);
      // p.image(img, 50, 50, 80, 80);
    };

    let bmid = windw / (14 * 2)
    let bY = p.mouseY - bmid;
  
    p.draw = function() {
      p.strokeWeight(windh / 100);
      DEFAULT.mousepos = p.mouseY / variationh;
      DEFAULT.w = windw;
      iio.emit("update_mouse", DEFAULT);

      p.clear();
      if (window.innerWidth > 1400)
        windw = window.innerWidth - (window.innerWidth - 1400) - 100
      else
        windw = window.innerWidth - 100;
      windh = (windw * 48) / 100;


      midline();
      drawScore();
      DifficultyLevel();
      
      
      p.rect(0, 0, 2, windh)
      p.rect(0, windh - 2, windw, 2)
      p.rect(0, 0, windw, 2)
      p.rect(windw - 2, 0, 2, windh)
//      p.rect((windw / 2) - 2, 0, 3, windh)
//      p.ellipse((windw / 2), windh / 2, 2 * (windw / 100) + 2);
      //console.log(15 + (windw / 100))

      bY = leftmouse;
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
      bY = rightmouse;
      bmid = (LeftPaddleHeight - 10) / 2
      if (bY > windh - bmid)
        bY = windh - bmid
      else if (bY < bmid)
        bY = bmid
      p.fill(250,250,250);
      p.stroke('rgba(132,51,125,0.5)');
      const RightPaddleY = bY - bmid;
      p.rect(RightPaddleX, RightPaddleY, RightPaddle, RightPaddleHeight - 10);

      BALL.ped1 = originleftmouse - 41;
      BALL.ped2 = originrightmouse - 41;

      
      move();
      

      

      if (oldwindw != windw)
      {
        p.resizeCanvas(windw, windh);
        oldwindw = windw
        LeftPaddleHeight = windw / 14;
        RightPaddleHeight = windw / 14;
        RightPaddleX = windw - 7;
        //console.log(windw)
        variationw = windw / 1300;
        variationh = windh / 624;
        if (windw <= 325)
          ball.r = 4;
        else if (windw <= 650)
          ball.r = 7;
        else if (windw <= 975)
          ball.r = 11;
        else
          ball.r = 15;
        //1300 650 325 975 15 7 4 11
      }
      
      p.strokeWeight(windh / 100);
      
     
      p.cursor(p.CROSS);
      // p.noCursor();
      if (isWon == true)
      {
        console.log("Won");
        p.imageMode(p.CENTER);
        p.image(imgwon, windw / 2, windh / 2, windw / 4, windw / 4);
        p.noLoop();
      }
      if (isLost == true)
      {
        console.log("Lost");
        p.imageMode(p.CENTER);
        p.image(imglost, windw / 2, windh / 2, windw / 4, windw / 4);
        p.noLoop();
      }
    };
};

export {s,iio}