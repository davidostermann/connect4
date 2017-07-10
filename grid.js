const chalk = require('chalk')

class Grid {

  getInitialState() { return [[], [], [], [], [], [], []] }

  constructor(colors = ['red', 'green'], data = this.getInitialState()) {
    this.data = data;
    this.colors = colors;
  }

  addToken(colorIndex, index) {
    if(this.data.length < 6) {
      this.data[index] = colorIndex;
    } else {
      throw( new Error('can\'t add more than 6 tokens in a column'))
    }
  }

  logGrid(grid) {
    let i = 6;
    while(i >= 0) {
      console.log( this.logLine(grid, i) )
      i--
    }
  }

  logLine(grid, lineIndex) {
    let colIndex = 0;
    let str = '';
    let c, n;
    while(i < 7) {
      n = grid[colIndex][lineIndex];
      c = this.colors[n];
      str += (n) ? `${chalk[c]('o')}` + ' ': 'o ';
      i++;
    }
    return str;
  }

}

module.exports = Grid