const {
  isFullGrid,
  chooseColumn,
  //chooseColumnIndex, 
  getAvailableColumns,
  getSeqLengthV,
  getSeqLengthH,
  getSeqLengthDLR,
  getSeqLengthDRL,
  getWinner,
  getMaxSeqLength,
  getBetterSequence,
  addVectorDistances,
  getVectorDistance,
  getClosest,
  getShortestYX,
  getShortest,
  strategyMedium,
  strategyTop,
  strategyExtra

} = require('../ia')
const {
  emptyGrid,
  oneTokenGrid,
  halfFullGrid,
  fullGrid,
  win0V13Grid,
  win0H60Grid,
  win0H00Grid,
  win0H10Grid,
  win0H20Grid,
  win0H30Grid,
  win0DLR10Grid,
  win0DLR21Grid,
  win0DLR32Grid,
  win0DLR43Grid,
  win0DRL13Grid,
  win0DRL22Grid,
  win0DRL31Grid,
  win0DRL40Grid,
  win1V$1,
  win0H$3,
  win1DLR$0,
  win1DRL$4,
} = require('../grids.mock')

describe('Full grid check', () => {

  it('is a full grid', () => {
    expect(isFullGrid(fullGrid)).toBe(true);
  })

  it('is not a full grid', () => {
    expect(isFullGrid(halfFullGrid)).toBe(false);
  })

  it('return -1 for full grid', () => {
    expect(chooseColumn(fullGrid)).toBe(-1);
  })

})

describe('IA choose column', () => {

  // it('it choose a column between 0 and 6', () => {
  //   const grid = emptyGrid
  //   const col = chooseColumnIndex(grid)
  //   expect(col).toBeGreaterThanOrEqual(0)
  //   expect(col).toBeLessThanOrEqual(6)
  // })

  // it('it choose a column which is not complete', () => {
  //   const grid = halfFullGrid
  //   const col = chooseColumnIndex(grid)
  //   expect(grid[col].length).toBeLessThan(6)
  // })

  it('it get all avaibles columns', () => {
    const grid = oneTokenGrid
    const arr = getAvailableColumns(grid)
    expect(arr.length).toBe(7)
  })

  it('it get all free columns', () => {
    const grid = emptyGrid
    const arr = getAvailableColumns(grid)
    expect(arr.map(e => e.length)).toEqual([0,0,0,0,0,0,0])
  })

  it('it get avaibles columns', () => {
    const grid = halfFullGrid
    const arr = getAvailableColumns(grid)
    expect(arr).toEqual([{ "index": 0, "length": 5 }, { "index": 3, "length": 5 }])
  })

  it('it get no avaibles columns', () => {
    const grid = fullGrid
    const arr = getAvailableColumns(grid)
    expect(arr).toEqual([])
  })

  it('it looks for column, but no one are availables. the grid is full.', () => {
    const grid = fullGrid
    const col = chooseColumn(grid, 0)
    expect(col).toBe(-1)
  })
})

describe('It check the result in specific direction', () => {

  it('it wins vertically', () => {
    expect(getSeqLengthV(win0V13Grid, 0, 1, 3)).toBe(4);
  })

  it('it lost vertically', () => {
    expect(getSeqLengthV(win0H60Grid, 0, 1, 3)).toBeLessThan(4);
  })

  it('it wins horizontally', () => {
    expect(getSeqLengthH(win0H60Grid, 0, 6, 0)).toBe(4);
    expect(getSeqLengthH(win0H00Grid, 0, 0, 0)).toBe(4);
    expect(getSeqLengthH(win0H10Grid, 0, 1, 0)).toBe(4);
    expect(getSeqLengthH(win0H20Grid, 0, 2, 0)).toBe(4);
    expect(getSeqLengthH(win0H30Grid, 0, 3, 0)).toBe(4);
  })

  it('it lost horizontally', () => {
    expect(getSeqLengthH(win0H60Grid, 0, 1, 0)).toBeLessThan(4);
  })

  it('it wins diagonally from left to right', () => {
    expect(getSeqLengthDLR(win0DLR10Grid, 0, 1, 0)).toBe(4);
    expect(getSeqLengthDLR(win0DLR21Grid, 0, 2, 1)).toBe(4);
    expect(getSeqLengthDLR(win0DLR32Grid, 0, 3, 2)).toBe(4);
    expect(getSeqLengthDLR(win0DLR43Grid, 0, 4, 3)).toBe(4);
  })

  it('it lost diagonally from left to right', () => {
    expect(getSeqLengthDLR(win0DLR10Grid, 0, 4, 3)).toBeLessThan(4);
  })

  it('it wins diagonally from right to left', () => {
    expect(getSeqLengthDRL(win0DRL13Grid, 0, 1, 3)).toBe(4);
    expect(getSeqLengthDRL(win0DRL22Grid, 0, 2, 2)).toBe(4);
    expect(getSeqLengthDRL(win0DRL31Grid, 0, 3, 1)).toBe(4);
    expect(getSeqLengthDRL(win0DRL40Grid, 0, 4, 0)).toBe(4);
  })

  it('it lost diagonally from right to left', () => {
    expect(getSeqLengthDRL(win0DRL13Grid, 0, 2, 2)).toBeLessThan(4);
  })

})

describe('It checks the result globally', () => {

  it('It wins globally', () => {
    expect(getWinner(win1V$1, 1)).toBe(true)
    expect(getWinner(win0H$3, 4)).toBe(true)
    expect(getWinner(win1DLR$0, 1)).toBe(true)
    expect(getWinner(win1DRL$4, 4)).toBe(true)
  })

})

describe('It gets the longer sequence for a column', () => {

  it('It gets 4 for column index 1 with first player', () => {
    expect(getMaxSeqLength(win0V13Grid, 1, 0)).toBe(4)
    expect(getMaxSeqLength(win0DLR10Grid, 1, 0)).toBe(4)
    expect(getMaxSeqLength(win0DRL13Grid, 1, 0)).toBe(4)
  })
  it('It gets 4 for column index 6 with first player', () => {
    expect(getMaxSeqLength(win0H60Grid, 6, 0)).toBe(4)
  })
  it('It gets 3 for column index 4 with first player', () => {
    expect(getMaxSeqLength(win0DRL13Grid, 4, 0)).toBe(3)
  })
  it('It gets 4 for column index 0 with second player', () => {
    expect(getMaxSeqLength(win0DRL13Grid, 0, 1)).toBe(4)
  })

})


describe('IA closest value', () => {

  it('gets 4 as closest value', () => {
    expect(getClosest([0, 1, 2, 3, 4, 5, 6], 4)).toBe(4)
  })

  it('gets 5 as closest value', () => {
    expect(getClosest([2, 1, 5, 6], 4)).toBe(5)
  })

  it('gets 3 as closest value', () => {
    expect(getClosest([2, 1, 3, 5, 6], 4)).toBe(3)
  })

  it('gets undefined as closest value', () => {
    expect(getClosest([], 4)).toBe(undefined)
  })

  it('gets 1 as closest value', () => {
    expect(getClosest([1], 4)).toBe(1)
  })

})

describe('It gets the better column to add a token', () => {

  const columnIndexes = [0, 1, 2, 3, 4, 5, 6];

  it('It gets the better index at 1', () => {
    expect(getBetterSequence(win0V13Grid, columnIndexes, 0).index).toBe(1)
  })

  it('It gets the better index with score 4', () => {
    expect(getBetterSequence(win0V13Grid, columnIndexes, 0).score).toBe(4)
  })

  it('It gets a silly index as first player', () => {
    expect(getBetterSequence(emptyGrid, columnIndexes, 1).index).toBe(0)
  })

  it('It gets a silly index at second player', () => {
    expect(getBetterSequence(oneTokenGrid, columnIndexes, 1).index).toBe(0)
  })

})

it('it gets the vector distance for columns', () => {
  expect(addVectorDistances(
    [
      { "index": 0, "length": 5 }, 
      { "index": 3, "length": 5 }
    ], 
    [3, 0]
  )).toEqual(
    [
      expect.objectContaining({
        "vDist": { "x": 3, "y": 5 } 
      }), 
      expect.objectContaining({
        "vDist": { "x": 0, "y": 5 } 
      })
    ]
  )
})

it('it gets the vector distance', () => {
  expect(getVectorDistance([3, 1], [2, 2])).toEqual({x:1, y:1})
})

describe('IA shortest YX value', () => {

  it('gets the shortest distance with preference to have less distance in Y axis', () => {
    const arr = [
      { vDist: { x: 0, y: 1 } }, 
      { vDist: { x: 2, y: 0 } },
      { vDist: { x: 1, y: 0 } }
    ]
    expect(getShortestYX(arr)).toEqual(arr[2])
  })

  it('gets the shortest distance YX', () => {
    const arr = addVectorDistances([
      { index: 0, length: 0 },
      { index: 1, length: 0 },
      { index: 2, length: 0 },
      { index: 3, length: 1 },
      { index: 4, length: 0 },
      { index: 5, length: 0 },
      { index: 6, length: 0 }
    ], [3, 0])
    expect(getShortestYX(arr)).toEqual(arr[2])
  })

})

describe('IA shortest value', () => {

  const arr = [
    { vDist: { x: 0, y: 1 } },
    { vDist: { x: 2, y: 0 } },
    { vDist: { x: 1, y: 0 } }
  ]

  const arr2 = [
    { vDist: { x: 2, y: 0 } },
    { vDist: { x: 1, y: 0 } },
    { vDist: { x: 0, y: 1 } }
  ]

  it('gets the shortest distance with preference to have less distance in Y axis', () => {
    expect(getShortestYX(arr)).toEqual(arr[2])
  })

  it('gets the shortest distance', () => {
    expect(getShortest(arr)).toEqual(arr[0])
  })

  it('gets the shortest distance arr2', () => {
    expect(getShortest(arr2)).toEqual(arr2[1])
  })

})

describe('MEDIUM STRATEGY', () => {

  it('It gets index 3 as first player', () => {
    const grid = emptyGrid
    const availableCols = getAvailableColumns(grid)
    const tokenIndex = 0
    
    expect(strategyMedium({
      grid,
      availableCols,
      tokenIndex
    })).toBe(3)
  })

  it('It gets index 3 index as second player', () => {
    const grid = oneTokenGrid
    const availableCols = getAvailableColumns(grid)
    const tokenIndex = 1
    expect(strategyMedium({
      grid,
      availableCols,
      tokenIndex
    })).toBe(3)
  })

})

describe('TOP STRATEGY', () => {

  it('It gets index 3 as first player', () => {
    const grid = emptyGrid
    const availableCols = getAvailableColumns(grid)
    const tokenIndex = 0

    expect(strategyTop({
      grid,
      availableCols,
      tokenIndex
    })).toBe(3)
  })

  it('It gets index 3 index as second player', () => {
    const grid = oneTokenGrid
    const availableCols = getAvailableColumns(grid)
    const tokenIndex = 1
    expect(strategyTop({
      grid,
      availableCols,
      tokenIndex
    })).toBe(3)
  })

})

describe('EXTRA STRATEGY', () => {

  it('It gets index 4 as first player', () => {
    const grid = emptyGrid
    const availableCols = getAvailableColumns(grid)
    const tokenIndex = 0

    expect(strategyExtra({
      grid,
      availableCols,
      tokenIndex
    })).toBe(3)
  })

  it('It gets index 4 index as second player', () => {
    const grid = oneTokenGrid
    const availableCols = getAvailableColumns(grid)
    const tokenIndex = 1
    expect(strategyExtra({
      grid,
      availableCols,
      tokenIndex
    })).toBe(2)
  })

})