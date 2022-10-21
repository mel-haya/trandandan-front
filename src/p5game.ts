import { io } from "socket.io-client";
const iio = io("http://127.0.0.1:3000/play");

const s = (p:any):any => {
  
  let windw:number;
  let imgwon:any;
  let imglost:any;
  let imgload:any;
  let imgwait:any;
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

  // function getRandomdy() {
  //   let value:number = (Math.random() * 100000) % 24 - 12;
  //   value =  (value < 1 && value > -1) ? 2: value;
  //   return value;
  // }
  
  // console.log(getRandomdy());

  const ball = {
    x:windw/2,
    y:windh/2,
    r:15,
    dx:0,
    dy:0,
    p1:0,
    p2:0,
    score1:0,
    score2:0,
    playerleft:"",
    playerright:"",
    middleY:0,
    counter:0,
    mDY:0,
  }

  // console.log(ball.dy);
  
  const DEFAULT  = {mousepos:0, room:"", pos:0}
  const BALL = {ball_data:ball}

  
  const gameEnded = false;
  let gameStart = false;
  let isLoad = true;
  let isWait = false;
  let isWon = false;
  let isLost = false;
  let isModern = false;
  
  
  let paddle1Y:number;
  const LeftPaddle:number=5;
  const RightPaddle:number=5;
  const LeftPaddleX:number = 3;
  let RightPaddleX:number = windw - 7;
  //the length of the paddles
  // let LeftPaddleHeight = 120;
  let LeftPaddleHeight:number = windw / 14;
  let RightPaddleHeight:number = windw / 14;
  //Score of the AI. A.k.A the Number of tries
  let player1:number = 0;
  let player2:number = 0;
  
  iio.on('fin', (data) => {
    data;
    p.remove();
    iio.off('connection');
    iio.off('takePosition');
    iio.off('mouse');
    iio.off('ball');
    iio.off('reset');
    iio.off('restart');
    iio.off('fin');
    // iio.off('done');
    iio.off('won');
    iio.off('lost');
    iio.off('watch_wait');
    iio.off('watch_work');
    iio.off('watch_modern');
    // iio.off('testinter');
    iio.disconnect();
  });
  
  iio.emit("connection", "");

  iio.on('connection', (data) => {
    if (data === "wait")
    {
      isLoad = true;
    }
    else if (data === "start")
    {
      isLoad = false;
      gameStart = true;
    }
    else if (data === "wait Modern")
    {
      isLoad = true;
      isModern = true;
    }
    else if (data === "start Modern")
    {
      isLoad = false;
      isModern = true;
      gameStart = true;
    }
  });

  iio.on('takePosition', (data) => {
    DEFAULT.pos = data.yourplace;
    DEFAULT.room = data.room;
    console.log(data.yourplace + " " + data.room);
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
    // console.log(isModern);
    BALL.ball_data.x = data.x * variationw;
    BALL.ball_data.y = data.y * variationh;
    BALL.ball_data.dx = data.dx;
    BALL.ball_data.dy = data.dy;
    if (isModern == true)
      BALL.ball_data.middleY = data.middleY * variationh;
  });

  iio.on('reset', (data) => {
    player1 = data.score1;
    player2 = data.score2;
    p.text("score " + player1 + " : " + player2, windw / 2 + 10, 30);
    p.noLoop();
  });
  
  iio.on('restart', (data) => {
    if (iio.id === data.room)
    {
      BALL.ball_data.x = data.x * variationw;
      BALL.ball_data.y = data.y * variationh;
      BALL.ball_data.dx = data.dx;
      BALL.ball_data.dy = data.dy;
    }
    if (gameStart === true)
      p.loop();
  });
  
  // iio.on('done', (data) => {
  //   p.noLoop();
  //   console.log(data);
  //   console.log("you win");
  //   gameStart = false;
  // });
  
  iio.on('won', (data) => {
    data;
    //iio.emit('gamedone', data);
    if (isLost === false)
    {
      isWon = true;
      gameStart = false;
      p.loop();
    }
  });

  iio.on('lost', (data) => {
    data;
    isLost = true;
    gameStart = false;
    p.loop();
  });

  iio.on('watch_wait', (data) => {
    data;
    isLoad = false;
    isWait = true;
    p.loop();
  });
  
  iio.on('watch_work', (data) => {
    data;
    isLoad = false;
    isWait = false;
    gameStart = true;
    p.loop();
  });

  iio.on('watch_modern', (data) => {
    data;
    isModern = true;
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


  function  DifficultyLevel(){
    p.fill('rgba(232,190,251,1)');
    if (windw > 700)
      p.textSize(20);
    else
      p.textSize(15);
    //  p.noStroke(23);
    let level:number = Math.abs(ball.dx) - 7;
    level = (level < 0) ? 0 : level;
    p.text("Difficulty:" + level, windw / 4 - windw / 20, 30);
    p.text(player2 + " : " + player1, (windw * 3) / 4 - windw / 30, 30);
    p.fill('rgba(172,70,130,1)');
  }

    
    function preload() {
      imgwon = p.loadImage('https://media.istockphoto.com/vectors/pixel-art-8bit-you-win-text-with-three-winner-golden-cups-on-black-vector-id1268272329?k=20&m=1268272329&s=170667a&w=0&h=79fO42ChPzO8gcIdzngCuag6_Y9ef2dUh1LWpaOkyXo=');
      imgload = p.loadImage(require('@/assets/waiting.jpg'));
      imgwait = p.loadImage(require('@/assets/game_wait.jpg'));
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
      p.clear();
      p.strokeWeight(windh / 100);
      DEFAULT.mousepos = p.mouseY / variationh;
      iio.emit("update_mouse", DEFAULT);

      if (window.innerWidth > 1400)
        windw = window.innerWidth - (window.innerWidth - 1400) - 100
      else
        windw = window.innerWidth - 100;
      windh = (windw * 48) / 100;


      midline();
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

//to be modify //done
      //opp paddle
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

      // to check
      if (isModern == true)
      {
        p.fill(236,132,236);
        p.rect(windw / 2 - 3, BALL.ball_data.middleY, 6, windw / 9);
      }


      // BALL.ped1 = originleftmouse - 41;
      // BALL.ped2 = originrightmouse - 41;

      p.fill(250,250 - ((Math.abs(ball.dx) - 7) * 15),250 - ((Math.abs(ball.dx) - 7) * 12));
      if (gameStart == true)
        p.ellipse(BALL.ball_data.x, BALL.ball_data.y, BALL.ball_data.r, BALL.ball_data.r);
      p.fill(250,250,250);
      

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
      if (isWait == true)
      {
        p.imageMode(p.CENTER);
        p.image(imgwait, windw / 2, windh / 2, (windw * 3) / (4 * 2), (windw * 2) / (4 * 2));
      }
      if (isLoad == true)
      {
        //console.log("loading");
        p.imageMode(p.CENTER);
        p.image(imgload, windw / 2, windh / 2, (windw * 3) / (4 * 2), (windw * 2) / (4 * 2));
        //p.noLoop();
      }
      if (isWon == true && isLost == false)
      {
        //console.log("Won");
        p.imageMode(p.CENTER);
        p.image(imgwon, windw / 2, windh / 2, windw / 4, windw / 4);
        // p.noLoop();
      }
      if (isLost == true)
      {
        //console.log("Lost");
        p.imageMode(p.CENTER);
        p.image(imglost, windw / 2, windh / 2, windw / 4, windw / 4);
        // p.noLoop();
      }
    };
};

export {s,iio}