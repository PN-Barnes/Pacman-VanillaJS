import { LEVEL, OBJECT_TYPE } from './setup';
import { randomMovement } from './ghostmoves';

// Classesss
import GameBoard from './GameBoard';
import Pacman from './Pacman';
import Ghost from './Ghost';
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

function gameLoop(pacman, ghosts) {
  gameBoard.moveCharacter(pacman);

  ghosts.forEach((ghost) => gameBoard.moveCharacter(ghost));
}

function startGame() {
  gameWon = false;
  powerActive = false;
  score = 0;

  startButton.classList.add('hide');

  gameBoard.createGrid(LEVEL);

  const pacman = new Pacman(2, 287);
  gameBoard.addObject(287, [OBJECT_TYPE.PACMAN]);
  document.addEventListener(
    'keydown',
    (e) => pacman.handleKeyInput(e, gameBoard.objectExist.bind(gameBoard))
    // objectExists will have to be binded to be able to reference => gameBoard.objectExists.bind(gameBoard). However, to avoid this gameBoard.js => objectExist method is changed to arrow fucntion // line 42
  );

  const ghosts = [
    new Ghost(5, 187, randomMovement, OBJECT_TYPE.BLINKY),
    new Ghost(4, 208, randomMovement, OBJECT_TYPE.PINKY),
    new Ghost(3, 229, randomMovement, OBJECT_TYPE.INKY),
    new Ghost(2, 250, randomMovement, OBJECT_TYPE.CLYDE),
  ];

  timer = setInterval(() => gameLoop(pacman, ghosts), GLOBAL_SPEED);
}

// * Initialize Game
startButton.addEventListener('click', startGame);
