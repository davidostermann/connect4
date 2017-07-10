const Player = require('./player')
const Grid = require('./grid')
const {chooseColumn} = require('./ia')

class Connect4 {
  
  constructor() {

    this.grid = new Grid();
    this.players = [new Player('red'), new Player('green')];
    this.currentPlayerIndex = 0;
  }

  getNextPlayerIndex() {
    return Number(!this.currentPlayerIndex)
  }

  getPlayer(index) {
    return this.players[index]
  }

  play() {
    this.currentPlayerIndex = this.getNextPlayerIndex();
    const currentPlayer = this.getPlayer(this.currentPlayerIndex);
    const gridIndex = chooseColumn(this.grid.data, currentPlayer.color);
    const token = currentPlayer.getToken();
    this.grid.addToken(token, this.currentPlayerIndex);
  }

}

module.exports = Connect4;