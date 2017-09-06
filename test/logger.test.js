const Logger = require('../logger')
const {
  getPaddedGrid
} = require('../Grid')
const {
  emptyGrid,
  halfFullGrid,
  fullGrid
} = require('../grids.mock')

let logger;
let grids;

beforeAll( () => {
  logger = new Logger();
  grids = {
    empty: getPaddedGrid(emptyGrid),
    halfFull: getPaddedGrid(halfFullGrid),
    full: getPaddedGrid(fullGrid),
  }
})

afterEach( () => {
  if(jest.isMockFunction(logger.drawLine)) {
    //console.log('AV logger.drawLine.mockRestore : ', logger.drawLine);
    logger.drawLine.mockRestore()
    //console.log('AP logger.drawLine.mockRestore : ', logger.drawLine);
  }
})

test('logger.drawLine have to be called 6 times', () => {
  //logger.drawLine = jest.fn()
  jest.spyOn(logger, 'drawLine')
  logger.drawGrid(grids.empty, ['red', 'green']);
  logger.drawGrid(grids.halfFull, ['red', 'green']);
  logger.drawGrid(grids.full, ['red', 'green']);
  // console.log('====================================');
  // console.log('jest.isMockFunction : ', jest.isMockFunction(logger.drawLine));
  // console.log('====================================');
  expect(logger.drawLine.mock.calls.length).toBe(18)
})

// test('log all test grid', () => {
//   logger.drawGrid(grids.empty, ['red', 'green']);
//   logger.drawGrid(grids.halfFull, ['red', 'green']);
//   logger.drawGrid(grids.full, ['red', 'green']);
// })
