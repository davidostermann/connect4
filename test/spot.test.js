const {
  getColor,
  isFreeSpot
} = require('../spot')

describe('it check free spot', () => {

    test('value 1 is not a free spot', () => {
      expect(isFreeSpot(1)).toBe(false)
    })

    test('value 0 is not a free spot', () => {
      expect(isFreeSpot(0)).toBe(false)
    })

    test('value null is not a free spot', () => {
      expect(isFreeSpot(null)).toBe(true)
    })

    test('value undefined is not a free spot', () => {
      expect(isFreeSpot(undefined)).toBe(true)
    })

})

let playersColor = ['green', 'red'];

describe('it returns the corresponding color', () => {

  test('it returns green for first player', () => {
    expect(getColor(playersColor)(0)).toBe('green');
  })

  test('it returns red for second player', () => {
    expect(getColor(playersColor)(1)).toBe('red');
  })

  test('it returns blue for null spot', () => {
    expect(getColor(playersColor)(null)).toBe('blue');
  })

  test('it returns blue for undefined spot', () => {
    expect(getColor(playersColor)(undefined)).toBe('blue');
  })

})