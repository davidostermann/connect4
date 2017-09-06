const _this = this;

exports.getInitialGrid = () => {
  return [[], [], [], [], [], [], []]
}

exports.addToken = (grid, columnIndex, playerIndex) => {
  if (grid[columnIndex].length < 6) {
    grid[columnIndex].push(playerIndex);
  } else {
    throw new Error('can\'t add more than 6 tokens in a column')
  }
  return grid;
}

exports.getPaddedGrid = (grid) => {
  return grid.map(column => _this.getPaddedColumn(column));
}

exports.getPaddedColumn = (column) => {
  return Array.from({ length: 6 }, (item, i) => (column[i] !== undefined) ? column[i] : null)
}

exports.getSpotValue = (grid, lineIndex, columnIndex) => {
  return grid[columnIndex][lineIndex];
}