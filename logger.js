const chalk = require('chalk')
const { getSpotValue } = require('./grid')
const { getColor } = require('./spot')

class Logger {
  
  /**
   * draw a grid (7 x 6)
   * @param {Array} paddedGrid - grid as array of column  cf. ./grids.mock.js
   * @param {Array} playersColors - array with 2 strings of hexadecimal color or css color name
   */
  drawGrid(paddedGrid, playersColors) {
    let lineIndex = 6;
    let str = '';
    while (--lineIndex >= 0) {
      str += `\n\r  ${this.drawLine(paddedGrid, lineIndex, playersColors)}`
    }
    console.log( str )
  }

  /**
   * draw a line of 7 item maximum where token are represented by a lowercase 'o' with player's color and empty place by a 'blue' lowercase 'o'. 
   * @param {Array} grid - grid as array of column  cf. ./grids.mock.js
   * @param {Number} lineIndex - index  
   * @param {Array} playersColors - array with 2 strings of hexadecimal color or css color name
   * @return {string} chalk string
   */
  drawLine(paddedGrid, lineIndex, playersColors) {
    const getSpotColor = getColor(playersColors)
    let value, color, str = '', columnIndex = 0;
    while(columnIndex < 7) {
      value = getSpotValue(paddedGrid, lineIndex, columnIndex)
      color = getSpotColor(value)
      str += `${chalk[color]('o')}  `;
      columnIndex++;
    }
    return str;
  }

  drawTie() {
    console.log('MATCH NUL')
  }

  drawWin(color) {
    console.log(`${color.toUpperCase()} WINS !`)
  }

};

module.exports = Logger;