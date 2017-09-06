const IA = {}

const strategies = ['strategyZero', 'strategyMedium', 'strategyTop', 'strategyExtra']

IA.chooseColumn = (grid, tokenIndex, level = 0) => {

  if(IA.isFullGrid(grid)) { return -1; }

  const availableCols = IA.getAvailableColumns(grid)
  
  return IA[strategies[level]]({ grid, availableCols, tokenIndex});
}

IA.strategyExtra = ({ grid, availableCols, tokenIndex }) => {

  const availableColIndexes = availableCols.map(e => e.index)
  const colsWithDist = IA.addVectorDistances(availableCols, [3, 0])
  const betterSequence = IA.getBetterSequence(grid, availableColIndexes, tokenIndex)
  const opponentSequence = IA.getBetterSequence(grid, availableColIndexes, IA.getOpponentToken(tokenIndex))

  if (opponentSequence.score === 4) {
    return opponentSequence.index
  }
  else if (betterSequence.score > 1) {
    return betterSequence.index
  } else {
    return IA.getShortestYX(colsWithDist).index;
  }
}

IA.strategyTop = ({grid, availableCols, tokenIndex}) => {

  const availableColIndexes = availableCols.map(e => e.index)
  const betterSequence = IA.getBetterSequence(grid, availableColIndexes, tokenIndex)
  const opponentSequence = IA.getBetterSequence(grid, availableColIndexes, IA.getOpponentToken(tokenIndex))

  if (opponentSequence.score === 3) {
    return opponentSequence.index
  }
  else if (betterSequence.score > 1) {
    return betterSequence.index
  } else {
    return IA.getClosest(availableColIndexes, 3);
  }
}

IA.strategyMedium = ({ grid, availableCols, tokenIndex}) => {

  const availableColIndexes = availableCols.map(e => e.index)
  const betterSequence = IA.getBetterSequence(grid, availableColIndexes, tokenIndex)
  if (betterSequence.score > 1) {
    return betterSequence.index
  } else {
    return IA.getClosest(availableColIndexes, 3);
  }
}

IA.strategyZero = ({ availableCols }) => {
  return IA.getRandomValueInArray(availableCols.map(e => e.index))
}

IA.getBetterSequence = (grid, columnIndexes, tokenIndex) => {

  return columnIndexes.map(colIndex => {
    return {
      index: colIndex,
      score: IA.getMaxSeqLength(grid, colIndex, tokenIndex)
    }
  }).sort((a, b) => b.score - a.score )[0]
}

// TODO : R.assoc
IA.addVectorDistances = (cols, [x, y]) => {
  return cols.map( col => 
    Object.assign(col, { vDist: IA.getVectorDistance([col.index, col.length], [x, y]) })
  )
}

IA.getVectorDistance = ([x1, y1], [x2, y2]) => {
  return {x: Math.abs(x1 - x2), y: Math.abs(y1 - y2)}
}

IA.getClosest = (arr, value) => {
  return [...arr].sort((a, b) => 
    Math.abs(value - a) - Math.abs(value - b)
  )[0]
}

IA.getShortest = (arr) => {
  return [...arr].sort((a, b) =>
    (a.vDist.x + a.vDist.y) - (b.vDist.x + b.vDist.y)
  )[0]
}

IA.getShortestYX = (arr) => {
  return [...arr].sort((a, b) =>
    a.vDist.y - b.vDist.y || a.vDist.x - b.vDist.x
  )[0]
}

IA.getOpponentToken = (v) => Number(!v)

// TODO : TEST RAMDA minBy to do it
// IA.getClosest = (arr, value) => arr.reduce((a, acc) => {
//   Math.min(Math.abs(value - a), Math.abs(value - acc))
// }, 999)

IA.isFullGrid = (grid) => {
  return grid.every( col => col.length === 6 )
}

// IA.chooseColumnIndex = (grid) => {
//   const availableColIndexes = IA.getAvailableColumnIndexes(grid)
//   return (availableColIndexes && availableColIndexes.length) ? IA.getRandomValueInArray(availableColIndexes) : -1;
// }

IA.getRandomValueInArray = (arr) => {
  return arr[IA.getRandom(arr.length)];
}

IA.getRandom = (max) => {
  return Math.floor(Math.random() * max);
}

IA.getAvailableColumns = (grid) => {
  return  grid.map( (col, i) => ({index: i, length: col.length}) )
              .filter( item => item.length < 6)
              .map( item => ({index: item.index, length: item.length}))
}

//max x = 6
//max y = 5
IA.getSeqLengthV = (grid, v, x, y) => {
  let yi = y;
  let pts = 1;

  while (--yi >= 0) {
    if (grid[x][yi] === v) pts++;
    else break;
  }
  
  return pts;
}

IA.getSeqLengthH = (grid, v, x, y) => {
  let xil = x;
  let xir = x;
  let pts = 1;

  while (--xil >= 0) {
    if (grid[xil][y] === v) pts++;
    else break;
  }

  while (++xir <= 6) {
    if (grid[xir][y] === v) pts++;
    else break;
  }

  return pts;
}

IA.getSeqLengthDLR = (grid, v, x, y) => {
  let xil = x;
  let yil = y;
  let xir = x;
  let yir = y;
  let pts = 1;

  while (--xil >= 0 && --yil >= 0) {
    if (grid[xil][yil] === v) pts++;
    else break;
  }

  while (++xir <= 6 && ++yir <= 5) {
    if (grid[xir][yir] === v) pts++;
    else break;
  }

  return pts;
}

IA.getSeqLengthDRL = (grid, v, x, y) => {
  let xil = x;
  let yil = y;
  let xir = x;
  let yir = y;
  let pts = 1;

  while (--xil >= 0 && ++yil <= 5) {
    if (grid[xil][yil] === v) pts++;
    else break;
  }

  while (++xir <= 6 && --yir >= 0) {
    if (grid[xir][yir] === v) pts++;
    else break;
  }

  return pts;
}

IA.getWinner = (grid, colIndex) => {
  const x = colIndex;
  const y = grid[colIndex].length - 1; //last token added
  const v = grid[x][y];

  if (IA.getSeqLengthV(grid, v, x, y) >= 4) return true;
  if (IA.getSeqLengthH(grid, v, x, y) >= 4) return true;
  if (IA.getSeqLengthDLR(grid, v, x, y) >= 4) return true;
  if (IA.getSeqLengthDRL(grid, v, x, y) >= 4) return true;
  return false
}

IA.getMaxSeqLength = (grid, colIndex, v) => {
  const x = colIndex;
  const y = grid[colIndex].length; //place where to add next token
  return Math.max(
    IA.getSeqLengthV(grid, v, x, y),
    IA.getSeqLengthH(grid, v, x, y),
    IA.getSeqLengthDLR(grid, v, x, y),
    IA.getSeqLengthDRL(grid, v, x, y)
  )
}

module.exports = IA;


