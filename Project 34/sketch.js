var dog, happyDog, database, foodS, foodStock;
var dog1, dog2;

function preload() {
  dog1 = loadImage("images/dogImg.png");
  dog2 = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,250,10,10);
  dog.addImage(dog1);
  dog.scale = 0.25;
  
  var foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  
}
 
function draw() {
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(dog2);
  }
  
  drawSprites();
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  
  if(x <= 0) {
    x = 0;
  }
  else {
    x = x-1;
  }
  
  database.ref('/').update({
    Food : x
  })
}