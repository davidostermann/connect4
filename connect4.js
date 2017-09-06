const Logger = require('./logger')
const {
  getInitialGrid,
  addToken,
  getPaddedGrid
} = require('./grid')
const { chooseColumnIndex, chooseColumn, getWinner} = require('./ia')

class Connect4 {
  
  constructor([player1, player2]) {
    this.maxStrokes = 42;
    this.currentStroke = 0;
    this.grid = getInitialGrid();
    this.players = [player1, player2];
    this.colors = this.players.map(p => p.color)
    this.levels = this.players.map(p => p.level)
    this.currentPlayerIndex = 0;
    this.logger = new Logger();
  }

  getNextPlayerIndex(v) {
    return Number(!v)
  }

  getPlayer(index) {
    return this.players[index]
  }

  play(columnIndex, playerIndex) {
    
    //const currentPlayer = this.getPlayer(this.currentPlayerIndex);
    //const token = currentPlayer.getToken();
    addToken(this.grid, columnIndex, playerIndex);
  }
  
  playAuto(untilTheEnd) {

    const colIndex = chooseColumn(this.grid, this.currentPlayerIndex, this.levels[this.currentPlayerIndex])
    this.play(colIndex, this.currentPlayerIndex )
    
    const hasWin = getWinner(this.grid, colIndex);
    if (hasWin) {
      this.logger.drawGrid(getPaddedGrid(this.grid), this.colors)
      this.logger.drawWin(this.colors[this.currentPlayerIndex])
      return;
    }

    this.currentPlayerIndex = this.getNextPlayerIndex(this.currentPlayerIndex);
    this.currentStroke++;
    if (untilTheEnd && this.currentStroke < this.maxStrokes) {
      this.playAuto(untilTheEnd);
    } else {
      this.logger.drawGrid(this.grid, this.colors);
      this.logger.drawTie();
    }
  }

}

module.exports = Connect4;