const Logger = require('../logger')
const {
  emptyGrid,
  halfFullGrid,
  fullGrid
} = require('../grids.mock')

let logger;

beforeAll( () => {
  logger = new Logger();
})

beforeEach( () => {
  if(logger.logLine.mockRestore) {
    logger.logLine.mockRestore()
  }
})

test('log a grid', () => {
  logger.logLine = jest.fn()
  logger.logGrid(halfFullGrid, ['red', 'green']);
  expect(logger.logLine.mock.calls.length).toBe(6)
})

test('log all test grid', () => {
  logger.logGrid(emptyGrid, ['red', 'green']);
  logger.logGrid(halfFullGrid, ['red', 'green']);
  logger.logGrid(fullGrid, ['red', 'green']);
})