const Player = require('./player')
const Connect4 = require('./connect4');

const connect4 = new Connect4([new Player('green', 1), new Player('red', 3)]);

connect4.playAuto(true);
