import { io } from "socket.io-client";
import {$token} from '@/axios';

const socket = io(`http://${process.env.VUE_APP_APP_NAME}:${process.env.VUE_APP_HOST_PORT}/play`, {
  extraHeaders: {
      "token": $token
  }
});

const s = (p:any):any => {
  
  let windw:number;
  let imgwon:any;
  let imglost:any;
  let imgload:any;
  let imgwait:any;
  let imgingame:any;
  let imgwry:any;
  let imgnM:any;
  let imgcongratulations:any;
  let imgbad:any;
  let imgprob:any;
  
  if (window.innerWidth > 1400)
    windw = window.innerWidth - (window.innerWidth - 1400) - 100
  else
    windw = window.innerWidth - 100;
  let oldwindw = windw;
  let windh = (windw * 48) / 100;

  let variationw = windw / 1300;
  let variationh = windh / 624;
  

  let leftmouse = 0;
  let rightmouse = 0;

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

  
  const DEFAULT  = {mousepos:0, room:"", pos:0}
  const BALL = {ball_data:ball}

  
  let conProb = true;
  let isconnected = false;
  let gameStart = false;
  let isLoad = false;
  let isWait = false;
  let isWon = false;
  let isLost = false;
  let isModern = false;
  let inGame = false;
  let wry = false;
  let noMatch = false;
  let iscongratulations = false;
  let isBad = false;
  
  
  let paddle1Y:number;
  const LeftPaddle:number=5;
  const RightPaddle:number=5;
  const LeftPaddleX:number = 3;
  let RightPaddleX:number = windw - 7;
  
  let LeftPaddleHeight:number = windw / 14;
  let RightPaddleHeight:number = windw / 14;
  
  let player1:number = 0;
  let player2:number = 0;
  
  socket.on('fin', (data:any) => {
    data;
    p.remove();
    socket.off('connection');
    socket.off('takePosition');
    socket.off('mouse');
    socket.off('ball');
    socket.off('reset');
    socket.off('restart');
    socket.off('fin');
    socket.off('done');
    socket.off('won');
    socket.off('lost');
    socket.off('watch_wait');
    socket.off('watch_work');
    socket.off('watch_modern');
    socket.off('inGame');
    socket.off('start_connection');
    socket.off('setScore');
    socket.disconnect();
  });
  

  socket.on('connection', (data:any) => {
    conProb = false;
    if (data === "wait")
    {
      isLoad = true;
    }
    else if (data === "start")
    {
      isLoad = false;
      isWait = false;
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
      isWait = false;
      isModern = true;
      gameStart = true;
    }
  });

  socket.on('takePosition', (data:any) => {
    DEFAULT.pos = data.yourplace;
    DEFAULT.room = data.room;
  });

  socket.on('mouse', (data:any) => {
    if (data.pos === 1)
      leftmouse = data.mousepos * variationh;
    else
      rightmouse = data.mousepos * variationh;
  });

  socket.on('ball', (data:any) => {
    BALL.ball_data.x = data.x * variationw;
    BALL.ball_data.y = data.y * variationh;
    BALL.ball_data.dx = data.dx;
    BALL.ball_data.dy = data.dy;
    if (isModern == true)
      BALL.ball_data.middleY = data.middleY * variationh;
  });

  socket.on('reset', (data:any) => {
    player1 = data.score1;
    player2 = data.score2;
    p.text("score " + player1 + " : " + player2, windw / 2 + 10, 30);
    p.noLoop();
  });
  
  socket.on('setScore', (data:any) => {
    player1 = data.score1;
    player2 = data.score2;
    p.text("score " + player1 + " : " + player2, windw / 2 + 10, 30);
  });
  
  socket.on('restart', (data:any) => {
    if (socket.id === data.room)
    {
      BALL.ball_data.x = data.x * variationw;
      BALL.ball_data.y = data.y * variationh;
      BALL.ball_data.dx = data.dx;
      BALL.ball_data.dy = data.dy;
    }
    if (gameStart === true)
      p.loop();
  });
  
  socket.on('won', (data:any) => {
    conProb = false;
    data;
    if (isLost === false)
    {
      isWon = true;
      gameStart = false;
      p.loop();
    }
  });

  socket.on('lost', (data:any) => {
    conProb = false;
    data;
    isLost = true;
    gameStart = false;
    p.loop();
  });
  
  socket.on('done', (data:any) => {
    conProb = false;
    data;
    isLoad = false;
    isWait = false;
    iscongratulations = true;
    p.loop();
  });

  socket.on('watch_wait', (data:any) => {
    conProb = false;
    data;
    isLoad = false;
    isWait = true;
    p.loop();
  });
  
  socket.on('watch_work', (data:any) => {
    conProb = false;
    data;
    isLoad = false;
    isWait = false;
    gameStart = true;
    p.loop();
  });

  socket.on('watch_modern', (data:any) => {
    conProb = false;
    data;
    isModern = true;
    p.loop();
  });
  
  socket.on('inGame', (data:any) => {
    conProb = false;
    data;
    inGame = true;
    isLoad = false;
    if (data === 2)
    {
      wry = true;
    }
    else if (data === 3)
    {
      isWait = false;
      noMatch = true;
      inGame = false;
    }
    else if (data === 4)
    {
      isWait = false;
      noMatch = false;
      inGame = false;
      isBad = true;
    }
    socket.off('connection');
    socket.off('takePosition');
    socket.off('mouse');
    socket.off('ball');
    socket.off('reset');
    socket.off('restart');
    socket.off('done');
    socket.off('won');
    socket.off('lost');
    socket.off('watch_wait');
    socket.off('watch_work');
    socket.off('watch_modern');
    socket.off('inGame');
    socket.off('setScore');
  });
  
  
  
  socket.on('start_connection', (data:any) => {
    conProb = false;
    data;
    if (inGame === false)
    {
      isconnected = true;
      socket.emit("connection", "");
    }
  });



  function midline(){
    let i = 0
    for(i = 0; i < windh; i += 45) {
      p.fill('rgba(172,70,130,1)');
      p.stroke(0);
      p.strokeWeight(0)
      p.rect(windw/2,i,2,30);
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
    let level:number = Math.abs(ball.dx) - 7;
    level = (level < 0) ? 0 : level;
    p.text("Difficulty: " + level, windw / 4 - windw / 20, 30);
    p.text(player2 + " : " + player1, (windw * 3) / 4 - windw / 30, 30);
    p.fill('rgba(172,70,130,1)');
  }

    function preload() {
      imgwon = p.loadImage('https://media.istockphoto.com/vectors/pixel-art-8bit-you-win-text-with-three-winner-golden-cups-on-black-vector-id1268272329?k=20&m=1268272329&s=170667a&w=0&h=79fO42ChPzO8gcIdzngCuag6_Y9ef2dUh1LWpaOkyXo=');
      imgload = p.loadImage(require('@/assets/waiting.jpg'));
      imgwait = p.loadImage(require('@/assets/game_wait.jpg'));
      imgingame = p.loadImage(require('@/assets/inaGame.jpeg'));
      imgwry = p.loadImage(require('@/assets/wryou.jpeg'));
      imgnM = p.loadImage(require('@/assets/noMatch.jpeg'));
      imgbad = p.loadImage(require('@/assets/badlink.jpg'));
      imgprob = p.loadImage(require('@/assets/conprob.jpeg'));
      imgcongratulations = p.loadImage(require('@/assets/congratulations.jpeg'));
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
    };

    let bmid = windw / (14 * 2)
    let bY = p.mouseY - bmid;
  
    p.draw = function() {
      p.clear();
      p.strokeWeight(windh / 100);
      DEFAULT.mousepos = p.mouseY / variationh;
      if (isconnected == true)
        socket.emit("update_mouse", DEFAULT);

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


      bY = leftmouse;
      bmid = (LeftPaddleHeight - 10) / 2
      if (bY > windh - bmid)
        bY = windh - bmid
      else if (bY < bmid)
        bY = bmid
      p.fill(250,250,250);
      p.stroke('rgba(132,51,125,0.5)');
      p.strokeWeight(4);
      paddle1Y = bY - bmid;
      p.rect(LeftPaddleX, paddle1Y, LeftPaddle, LeftPaddleHeight - 10);

      //second paddle
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

      if (isModern == true)
      {
        p.fill(236,132,236);
        p.rect(windw / 2 - 3, BALL.ball_data.middleY, 6, windw / 9);
      }

      if (isModern == true)
        p.fill(250,250 - ((Math.abs(ball.dx) - 7) * 15),250 - ((Math.abs(ball.dx) - 7) * 12));
      else
        p.fill(250,250,250);

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
      }
      
      p.strokeWeight(windh / 100);
      
      // p.cursor(p.CROSS);
      p.noCursor();

      if (iscongratulations == true)
      {
        p.imageMode(p.CENTER);
        p.image(imgcongratulations, windw / 2, windh / 2, (windw * 3) / (4 * 2), windw / 4);
        p.cursor(p.CROSS);
      }
      if (wry == true)
      {
        p.imageMode(p.CENTER);
        p.image(imgwry, windw / 2, windh / 2, (windw * 3) / (4 * 2), windw / 4);
        p.cursor(p.CROSS);
      }
      else if (isBad == true)
      {
        p.imageMode(p.CENTER);
        p.image(imgbad, windw / 2, windh / 2, (windw * 3) / (4 * 2), windw / 4);
        p.cursor(p.CROSS);
      }
      else if (noMatch == true && isWon == false && isLost == false)
      {
        p.imageMode(p.CENTER);
        p.image(imgnM, windw / 2, windh / 2, (windw * 3) / (4 * 2), windw / 4);
        p.cursor(p.CROSS);
      }
      else if (inGame == true)// && isWon == false && isLost == false)
      {
        p.imageMode(p.CENTER);
        p.image(imgingame, windw / 2, windh / 2, (windw * 3) / (4 * 2), windw / 4);
        p.cursor(p.CROSS);
      }
      if (isWait == true && inGame == false)
      {
        p.imageMode(p.CENTER);
        p.image(imgwait, windw / 2, windh / 2, (windw * 3) / (4 * 2), windw / 4);
        p.cursor(p.CROSS);
      }
      if (isLoad == true && inGame == false)
      {
        p.imageMode(p.CENTER);
        p.image(imgload, windw / 2, windh / 2, (windw * 3) / (4 * 2), windw / 4);
        p.cursor(p.CROSS);
      }
      if (isWon == true && isLost == false && inGame == false)
      {
        iscongratulations = false;
        p.imageMode(p.CENTER);
        p.image(imgwon, windw / 2, windh / 2, windw / 4, windw / 4);
        p.cursor(p.CROSS);
      }
      if (isLost == true && inGame == false)
      {
        iscongratulations = false;
        p.imageMode(p.CENTER);
        p.image(imglost, windw / 2, windh / 2, windw / 4, windw / 4);
        p.cursor(p.CROSS);
      }
      if (conProb == true)
      {
        p.imageMode(p.CENTER);
        p.image(imgprob, windw / 2, windh / 2, (windw * 3) / (4 * 2), windw / 4);
        p.cursor(p.CROSS);
      }
    };
};

function disconnectSocket(){
  socket.emit("discn", "");
}

function connectSocket(){
  if (socket.connected == false)
    socket.connect();
}

function setMetadata(_id:any, _mode:string){
  socket.emit('getIDS', {token:$token, id:_id, socket:"", room:"", mode:_mode, pos:0})
}

export {s,disconnectSocket,setMetadata,connectSocket, socket}