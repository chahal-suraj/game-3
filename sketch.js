var bg,bgImg;
var player, shooterImg, shooter_shooting;
var bullet;
var Zombie,ZombieImg;
var gameState=PLAY;
var PLAY=1;
var END=0; 
var score;

function preload(){
  shooterImg = loadImage("assets/shooter_2.png");
  shooter_shooting = loadImage("assets/shooter_3.png");
  bgImg = loadImage("assets/bg.jpeg");
  ZombieImg = loadImage("assets/zombie.png");
}

function setup() {
createCanvas(1000,700);

bg = createSprite(500,400,1000,1000)
bg.addImage(bgImg)

player = createSprite(200,500,50,50);
player.addImage(shooterImg);
player.scale = 0.3;
player.debug = false;
player.setCollider("rectangle",0,0,300,300);

bulletGroup=new Group();
zombieGroup=new Group();

score=0;
}

function draw() {
  background(0); 
  text("score: "+score,800,500);
  fill("white")
  
if(gameState===PLAY){
player.visible=true;
}
if(gameState===END){
  zombieGroup.destroyEach();
  bulletGroup.destroyEach();
  player.visible=false;
}
if (zombieGroup.collide(player)) {
  gameState=END;
}
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}
if (bulletGroup.isTouching(zombieGroup)) {
  zombieGroup.destroyEach();
  bulletGroup.destroyEach();
  score+=20;
}

drawSprites();
s();
createZombie();

}



function s(){
  if(keyWentDown("space")){
    player.addImage(shooter_shooting);
    shootBullet();
  }
  else if(keyWentUp("space")){
    player.addImage(shooterImg);
    bullet.velocityX=5;
  }
}

function shootBullet(){
  bullet= createSprite(150, width/2, 50,20)
  bullet.y= player.y-20
  bullet.scale=0.12
  bullet.velocityX= 7
  bulletGroup.add(bullet)
}

function createZombie(){
  if(frameCount%100===0){
  Zombie = createSprite(800,random(20,780),40,40);
  Zombie.addImage(ZombieImg);
  Zombie.scale = 0.2;
  Zombie.velocityX = -3;
  Zombie.lifetime = 600;
  zombieGroup.add(Zombie);
}
}