const Connect4 = require('../connect4');
const Player = require('../player');

let connect4Instance = null;

beforeAll(() => {
  connect4Instance = new Connect4([new Player('red'), new Player('yellow')])
})

test('it exists an instance of Connect4', ()=> {
  expect( connect4Instance).toBeDefined()
})

test('it has a grid', ()=> {
  expect( connect4Instance.grid).toBeDefined()
})

test('it has two players', ()=> {
  expect( connect4Instance.players.length).toBe(2)
})

test('it switch player from 0 to 1', () => {
  connect4Instance.currentPlayerIndex = connect4Instance.getNextPlayerIndex(connect4Instance.currentPlayerIndex)
  expect(connect4Instance.currentPlayerIndex).toBe(1)
})

test('it switch player from 1 to 0', () => {
  connect4Instance.currentPlayerIndex = connect4Instance.getNextPlayerIndex(connect4Instance.currentPlayerIndex)
  expect(connect4Instance.currentPlayerIndex).toBe(0)
})

// test('each players is an instance of Player', () => {
//   //connect4Instance.players.map( item => expect.toBeInstanceOf(Player));
// })