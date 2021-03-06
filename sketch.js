var backImage,backgr;
var player, player_running;
var ground,ground_img,bananaImg;
var bananaImg,obstacleImg;
var END =0;
var PLAY =1;
var gameState = PLAY;
var score=0;

function preload(){

  bananaImg=loadImage("images/banana.png");
  backImage=loadImage("images/jungle.jpg");
  player_running = loadAnimation("images/Monkey_01.png","images/Monkey_02.png","images/Monkey_03.png",
  "images/Monkey_04.png","images/Monkey_05.png","images/Monkey_06.png","images/Monkey_07.png","images/Monkey_08.png"
  ,"images/Monkey_09.png","images/Monkey_10.png");
  obstacleImg=loadImage("images/stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
 // player.debug=true;

  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  FoodGroup= new Group();
  obstacleGroup= new Group();
  
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    if(FoodGroup.isTouching(player)){
      FoodGroup.destroyEach();
      score=score+2;
      player.scale=player.scale+0.1;
    }

  if(obstacleGroup.isTouching(player)){
    gameState=END
  }

  if(gameState===END){
    textSize(30);
    stroke("white");
    strokeWeight(5);
    fill("black");
    text("GAME OVER!!!",400,200)
    backgr.velocityX=0;
    player.visible=false;
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
  }

    spawnFood();
    spawnObstacle();
  }

  if(gameState===END){
  textSize(30); 
  background("black");
  stroke("white"); 
  strokeWeight(5); 
  fill("black"); 
  text("GAME OVER!!!",400,200); 
  backgr.velocityX=0; 
  backgr.destroy();
  player.visible=false; 
  FoodGroup.destroyEach(); 
  obstacleGroup.destroyEach(); 
}

  drawSprites();

  textSize(20);
  stroke("white");
  strokeWeight(2);
  fill("white");
  text("score: "+score,50,50);

}

function spawnFood(){

  if(frameCount%80==0){
  var banana=createSprite(600,random(120,200),40,10);
  banana.addImage(bananaImg);
  banana.scale=0.05;
  banana.velocityX=-4;

  banana.lifetime=400;
  player.depth=banana.depth+1;
  FoodGroup.add(banana);
 // banana.debug=true;
}
}

function spawnObstacle(){
  if(frameCount%200==0){
     var obstacle=createSprite(random(400,800),330,30,30);
     obstacle.addImage(obstacleImg);
     obstacle.scale=0.5;
     obstacle.velocityX=-4;
     obstacle.setCollider("circle",0,0,150);

     obstacle.lifetime=300;
     player.depth=obstacle.depth+1;
     obstacleGroup.add(obstacle);
     //obstacle.debug=true;
  }
}