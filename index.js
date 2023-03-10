import { LEVEL, OBJECT_TYPE } from './setup';
import { randomMovement } from './ghostmoves';

// Classesss
import GameBoard from './GameBoard';
import Pacman from './Pacman';
import Ghost from './Ghost';
// Sounds
import soundDot from './sounds/munch.wav';
import soundPill from './sounds/pill.wav';
import soundGameStart from './sounds/game_start.wav';
import soundGameOver from './sounds/death.wav';
import soundGhost from './sounds/eat_ghost.wav';

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

// Audio
function playAudio(sound) {
  const soundEffect = new Audio(sound);
  soundEffect.play();
}
const gameOver = (pacman, grid) => {
  playAudio(soundGameOver);
  document.removeEventListener('keydown', (e) =>
    pacman.handleKeyInput(e, gameBoard.objectExist)
  );

  gameBoard.showGameStatus(gameWon);
  clearInterval(timer);

  startButton.classList.remove('hide');
};

const checkCollision = (pacman, ghosts) => {
  const collidedGhosts = ghosts.find((ghost) => pacman.pos === ghost.pos);

  if (collidedGhosts) {
    if (pacman.powerPill) {
      playAudio(soundGhost);
      gameBoard.removeObject(collidedGhosts.pos, [
        OBJECT_TYPE.GHOST,
        OBJECT_TYPE.SCARED,
        collidedGhosts.name,
      ]);
      collidedGhosts.pos = collidedGhosts.startPos;
      score += 100;
    } else {
      gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PACMAN]);
      gameBoard.rotateDiv(pacman.pos, 0);
      gameOver(pacman, gameGrid);
    }
  }
};

function gameLoop(pacman, ghosts) {
  gameBoard.moveCharacter(pacman);
  checkCollision(pacman, ghosts);
  ghosts.forEach((ghost) => gameBoard.moveCharacter(ghost));
  checkCollision(pacman, ghosts);

  if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.DOT)) {
    playAudio(soundDot);
    gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.DOT]);
    gameBoard.dotCount--;
    score += 10;
  }
  // check if pacman eats a powerpill
  if (gameBoard.objectExist(pacman.pos, OBJECT_TYPE.PILL)) {
    playAudio(soundPill);
    gameBoard.removeObject(pacman.pos, [OBJECT_TYPE.PILL]);

    pacman.powerPill = true;
    score += 50;

    clearTimeout(powerActiveTimer);
    powerActiveTimer = setTimeout(
      () => (pacman.powerPill = false),
      POWER_PILL_TIME
    );
  }

  // Change ghost scared or not depending on power pill
  if (pacman.powerPill !== powerActive) {
    powerActive = pacman.powerPill;
    ghosts.forEach((ghost) => (ghost.isScared = pacman.powerPill));
  }

  if (gameBoard.dotCount === 0) {
    gameWon = true;
    gameOver(pacman, ghosts);
  }

  scoreTable.innerHTML = score;
}

function startGame() {
  playAudio(soundGameStart);
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
