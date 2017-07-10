const Player = require('../player');

let playerInstance;

beforeAll( () => {

})

test('player has a color', () => {
  const playerInstance = new Player('red'); 
  expect( playerInstance.color ).toBeDefined();
})

test('player\'s has red color' , () => {
  const playerInstance = new Player('red'); 
  expect( playerInstance.color ).toBe('red');
})

test('player has to have 21 tokens at startup', () => {
  const playerInstance = new Player('red'); 
  expect( playerInstance.tokenCount).toBe(21)
})