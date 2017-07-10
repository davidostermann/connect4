const {chooseColumnIndex, getAvailableColumnIndexes} = require('../ia')
const {
  emptyGrid,
  halfFullGrid,
  fullGrid
} = require('../grids.mock')

describe('IA choose column', () => {
  
  it('it choose a column between 0 and 6', () => {
    const grid = emptyGrid
    const col = chooseColumnIndex(grid, 'red')
    expect(col).toBeGreaterThanOrEqual(0)
    expect(col).toBeLessThanOrEqual(6)
  })

  it('it choose a column which is not complete', () => {
    const grid = halfFullGrid
    const col = chooseColumnIndex(grid, 'red')
    expect(grid[col].length).toBeLessThan(6)
  })

  it('it get avaibles columns', () => {
    const grid = halfFullGrid
    const arr = getAvailableColumnIndexes(grid, 'red')
    expect(arr).toEqual([0, 3])
  })

  it('it get no avaibles columns', () => {
    const grid = fullGrid
    const arr = getAvailableColumnIndexes(grid, 'red')
    expect(arr).toEqual([])
  })

  it('it looks for column, but no one are availables. the grid is full.', () => {
    const grid = fullGrid
    const col = chooseColumnIndex(grid, 'red')
    expect(col).toBe(-1)
  })

})

