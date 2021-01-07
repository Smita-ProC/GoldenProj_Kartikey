var play;
var gameState =0;
var backgroundColor ="black";
var playImg;
var backgroundCastle 
var player,playerImg;
var ground,invisibleGround;
var enemyGroup;
var friendsImg;
var FriendsGroup;
var create_team_mem = 0;

var player_change;

var ObstaclesGroup;
var edges;

var fr_index =0;

var FriendsTeam =[];

function preload()
{
  playImg =loadImage("play.png")
  friendsImg =loadImage("among.png")
  backgroundCastle =loadImage("castle.png");
  playerImg =loadImage("newplayer.jpeg");
  player_change = loadImage("player1.png");
  
}

function setup() {
  createCanvas(1600,400);

  play =createSprite(width/2,height/2,60,20);
  play.addImage(playImg);
  play.visible =false;

  player =createSprite(200,360,20,50);
  player.addImage(playerImg)

  player.setCollider("circle",0,0,100);
 
  player.scale = 0.5;
  player.x = 50;

  ground = createSprite(200,360,2800,20);
  ground.visible =false;


  invisibleGround =createSprite(800,390,1600,20)
  invisibleGround.visible =true;

  edges =createEdgeSprites();

  ObstaclesGroup = createGroup();
  FriendsGroup = createGroup();

}
function draw() {
  background(backgroundColor);  
 // camera.position.x = player.x;
 // camera.position.y = player.y;

  if(gameState === 0)
  {
    play.visible =true;
    
    if(mousePressedOver(play))
    {
      gameState = 1;

    }
  }

  if(gameState === 1)
  {
    play.visible =false;
    backgroundColor =backgroundCastle;
    spawnFriends();
    
    if(keyDown(RIGHT_ARROW))
    {
      player.x =player.x +5;
    }

    spwanObstacles();
    if(keyDown(LEFT_ARROW))
    {
      player.x =player.x -5;
    }
    

    if(keyDown(UP_ARROW) && player.y >= 300)
    {
      player.velocityY =-10;
    }

    player.velocityY +=0.5;

  }
 
   player.collide(edges[0]);
   player.collide(edges[1]);
 // invisibleGround.display();
  player.collide(invisibleGround);

  if(player.isTouching(FriendsGroup))
  {
  
    for(var i =0; i < FriendsGroup.length; i++)
    {
        if(FriendsGroup.get(i).isTouching(player))
        {
          FriendsGroup.get(i).addImage(player_change);
          FriendsGroup.get(i).scale = 0.6; 
          create_team_mem = 1;      
          FriendsGroup.get(i).remove();
        }
      }
  }

  else if(FriendsGroup.isTouching(ObstaclesGroup)){
    
  }

  

 

  ConnectTeam();
  drawSprites();

}

function spwanObstacles()
{
  if(frameCount%400 === 0)
  {
  var obstacle =createSprite(1600,random(200,350),30,30);
  obstacle.velocityX =random(-4,-9);
  obstacle.lifetime =400;

  player.depth =obstacle.depth;
  obstacle.depth +=1;

  ObstaclesGroup.add(obstacle);
  }
}

function spawnFriends()
{
  if(frameCount%400 === 0)
  {
      
    var friends =createSprite(random(500,1500),300,30,30);
    friends.addImage(friendsImg);
    friends.setCollider("rectangle",0,0,200,200);
  

    friends.scale =0.10;

    friends.depth = player.depth;
    FriendsGroup.add(friends);
  
  }
}


function ConnectTeam(){
  if(create_team_mem === 1)
  {
    FriendsTeam[fr_index] =createSprite(500,300,30,30);
    FriendsTeam[fr_index].addImage(player_change);
    create_team_mem = 0;
    fr_index = fr_index+1;
  }
  for(var i =0; i<FriendsTeam.length; i++)
  {
   FriendsTeam[i].x =player.x -(i*50+50);
   FriendsTeam[i].y =player.y ;
  }
}
