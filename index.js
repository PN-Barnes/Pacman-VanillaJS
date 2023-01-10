import { LEVEL, OBJECT_TYPE } from './setup';

// Document Elements
const gameGrid = document.querySelector('#game');
const scoreTable = document.querySelector('#score');
const startButton = document.querySelector('#start-button');

// Game Constants
const powerPillTime = 10000;
const globalSpeed = 80;

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
