class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionX = 0;
    this.positionY = 0;
    this.life = 185;
  }

  addPlayer() {
    var playerIndex = "players/player" + this.index;

    if (this.index === 1) {
      this.positionX = width / 2 - 200;
      this.positionY = height / 2;
    } else {
      this.positionX = width / 2 + 200;
      this.positionY = height / 2;
    }

    database.ref(playerIndex).set({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY,
      life: this.life
    });
  }

  getCount() {
    var playerCountRef = database.ref("playerCount");
    playerCountRef.on("value", data => {
      playerCount = data.val();
    });
  }

  updateCount(count) {
    database.ref("/").update({
      playerCount: count
    });
  }

  update() {
    database.ref("players/player" + this.index).update({
      positionX: this.positionX,
      positionY: this.positionY,
      life: this.life
    })
  }
  updatenew() {
    if (this.index === 1) {
      database.ref("players/player" + (this.index + 1)).update({
        life: this.life
      })
    }
    if (this.index === 2) {
      database.ref("players/player" + (this.index - 1)).update({
        life: this.life
      })
    }
  }

  static getPlayersInfo() {
    var playerInfoRef = database.ref("players");
    playerInfoRef.on("value", data => {
      allPlayers = data.val();
    });
  }
}
