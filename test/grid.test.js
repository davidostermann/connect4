const Grid = require('../grid')
let grid;


beforeAll( () => {
  grid = new Grid();
})

test('it has a grid with data', ()=> {
  expect( grid.data).toBeDefined()
})

test('data grid is an array', ()=> {
  expect( grid.data).toBeInstanceOf(Array)
})

test('it create un connect4 with 7 columns', ()=> {
  expect( grid.data.length).toBe(7)
})
