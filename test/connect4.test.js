const Connect4 = require('../connect4');
const Player = require('../player');

let connect4Instance = null;

beforeAll(() => {
  connect4Instance = new Connect4()
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

// test('each players is an instance of Player', () => {
//   //connect4Instance.players.map( item => expect.toBeInstanceOf(Player));
// })