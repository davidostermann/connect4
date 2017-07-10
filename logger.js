const chalk = require('chalk')

class Logger {
 
  logGrid(grid, colors) {
    let i = 6;
    let str = '';
    while(--i >= 0) {
      str += `\n\r  ${this.logLine(grid, i, colors)}`
    }
    console.log( str )
  }

  logLine(grid, lineIndex, colors) {
    let c, n, str = '', colIndex = 0;
    while(colIndex < 7) {
      n = (grid[colIndex].length > lineIndex) ? grid[colIndex][lineIndex] : null;
      c = n !== null && colors[n]
      str += (n !== null) ? `${chalk[c]('o')}  ` : `${chalk.blue('o')}  `;
      colIndex++;
    }
    return str;
  }

};

module.exports = Logger;