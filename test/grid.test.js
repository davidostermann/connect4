const {
  getInitialGrid,
  addToken,
  getPaddedGrid
} = require('../grid')

const {
  emptyGrid,
  halfFullGrid,
  fullGrid
} = require('../grids.mock')

test('it has a grid with data', ()=> {
  expect( getInitialGrid() ).toBeDefined()
})

test('data grid is an array', ()=> {
  expect( getInitialGrid() ).toBeInstanceOf(Array)
})

test('it create un grid with 7 columns', ()=> {
  expect( getInitialGrid().length ).toBe(7)
})

test('it create un grid with empty columns', () => {
  const grid = getInitialGrid();
  grid.forEach( column => expect(column.length).toBe(0))
})

test('it create a padded grid of 7x6', () => {
  const paddedGrid = getPaddedGrid(halfFullGrid);
  paddedGrid.forEach( paddedCol => {
    expect(paddedCol.length).toBe(6)
  })
})

test('it create a padded column of 6', () => {
  const paddedGrid = getPaddedGrid(halfFullGrid);
  paddedGrid.forEach(paddedCol => {
    expect(paddedCol.length).toBe(6)
  })
})

test('it create a padded grid that reflect the source grid', () => {
  const paddedGrid = getPaddedGrid(halfFullGrid);

  halfFullGrid.forEach( (sourceCol, c) => 
    sourceCol.forEach( (sourceToken, l) => 
      expect(sourceToken).toBe(paddedGrid[c][l])
    )
  )
})

test('it add a token to an available column', () => {
  expect(addToken(emptyGrid, 0)[0]).toHaveLength(1)
})

test('it add a token to a full column', () => {
  expect(function () {addToken(fullGrid, 1)} ).toThrow()
})
