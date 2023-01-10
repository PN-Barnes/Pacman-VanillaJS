import { LEVEL, OBJECT_TYPE } from './setup';

// Classes
import GameBoard from './GameBoard';
// Document Elements
const gameGrid = document.querySelector('#game');
const scoreTable = document.querySelector('#score');
const startButton = document.querySelector('#start-button');

// Game Constants => Capitol for clear definition of constant through entire game function
const POWER_PILL_TIME = 10000; // Milliseconds
const GLOBAL_SPEED = 80; // Milliseconds
const gameBoard = GameBoard.createGameBoard(gameGrid, LEVEL);

// Setup
let score = 0;
let timer = null;
let gameWon = false;
let powerActive = false;
let powerActiveTimer = null;

const gameOver = (pacman, grid) => {};

const checkCollision = (pacman, ghosts) => {};

const gameLoop = (pacman, ghosts) => {};

const startGame = () => {};
