class Game {
  constructor() {
    this.resetTitle = createElement("h2");
    this.resetButton = createButton("");
    this.leftKeyActive = false;
  }

  getState() {
    database.ref("gameState").on("value", function (data) {
      gameState = data.val();
    });
  }

  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    jet1 = createSprite(width / 2 - 50, height - 100);
    jet1.addImage("jet1", jet1_img);
    jet1.scale = 1;

    jet2 = createSprite(width / 2 + 100, height - 100);
    jet2.addImage("jet2", jet2_img);
    jet2.scale = 1;

    jets = [jet1, jet2];
    bulletGroup = new Group();
  }

  handleElements() {
    form.hide();
    // form.titleImg.position(40, 50);
    // form.titleImg.class("gameTitleAfterEffect");
    this.resetTitle.html("Reset Game");
    this.resetTitle.class("resetText");
    this.resetTitle.position(width / 2 + 450, 40);

    this.resetButton.class("resetButton");
    this.resetButton.position(width / 2 + 480, 100);
  }

  play() {
    this.handleElements();
    this.handleResetButton();
    Player.getPlayersInfo();

    if (allPlayers !== undefined) {
      image(bg, 0, -height * 5, width, height * 6);
     
      var index = 0;
      for (var plr in allPlayers) {
        index = index + 1;
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;
       
        jets[index - 1].position.x = x;
        jets[index - 1].position.y = y;
        if (index === player.index) {

          this.handlebulletCollision(index);

        }
      }
      this.handlePlayerControls();
      drawSprites();
    }
  }

  handlePlayerControls() {
    if (keyDown(UP_ARROW)) {
      player.positionY += 10;
      player.update();
      this.leftKeyActive = true;
    }
    if (keyDown(DOWN_ARROW)) {
      player.positionY -= 10;
      player.update();
      this.leftKeyActive = true;
    }
    if (keyDown(LEFT_ARROW)) {
      player.positionX -= 10;
      player.update();
      this.leftKeyActive = true;
    }
    if (keyDown(RIGHT_ARROW)) {
      player.positionX += 10;
      player.update();
      this.leftKeyActive = true;
    }
    if (keyDown("space")) {
      this.shoot();
    }

  }
  shoot() {
    if (player.index == 1) {
      var bullet = createSprite(player.positionX, player.positionY)
      bullet.x = player.positionX+50;
      bullet.y = height - player.positionY
      bullet.velocityX = 10;
      //bullet.depth=player.depth-2;
      bullet.scale = 0.2
      bullet.addImage(bullet1Img);
      bullet.lifetime = 800;
      bulletGroup.add(bullet);
    }
    else if (player.index == 2) {
      var bullet = createSprite(player.positionX, player.positionY)
      bullet.x = player.positionX-50
      bullet.y = height - player.positionY
      bullet.velocityX = -10;
      //bullet.depth=player.depth-2;
      bullet.scale = 0.2
      bullet.addImage(bullet2Img);
      bullet.lifetime = 800;
      bulletGroup.add(bullet);
    }
  }
  handleResetButton() {
    this.resetButton.mousePressed(() => {
      database.ref("/").set({
        playerCount: 0,
        gameState: 0,
        players: {},

      });
      window.location.reload();
    });
  }

  handlebulletCollision(index) {

    if (jets[index - 1].collide(bulletGroup)) {
      console.log("collision happened");
      
      if (player.life > 0) {
        bulletGroup.destroyEach();
        
       player.life-=185/4;
     }
      player.updatenew();

      if (player.life <= 0) {
        gameState = 2;
        this.gameOver();
      }
    }



  }

 

  showRank() {
    swal({
      title: `Awesome!${"\n"}Rank${"\n"}${player.rank}`,
      text: "You reached the finish line successfully",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize: "100x100",
      confirmButtonText: "Ok"
    });
  }

  gameOver() {
    swal({
      title: `Game Over`,
      text: "Oops you lost the race....!!!",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    });
  }
  end(){
    console.log("Game ended for u!!!!")
  }
}
