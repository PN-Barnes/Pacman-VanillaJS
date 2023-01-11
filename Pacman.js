import { OBJECT_TYPE, DIRECTIONS } from './setup';

class Pacman {
  constructor(speed, startPosition) {
    this.positon = startPosition;
    this.speed = speed;
    this.direction = null;
    this.timer = 0;
    this.powerPill = false;
    this.rotation = true;
  }

  shouldMove() {
    if (!this.direction) return false;
    if (this.timer === this.speed) {
      this.timer = 0;
      return true;
    }
    this.timer++;
  }

  getNextMove(objectExist) {
    let nextMovePosition = this.pos + this.direction.movement;

    if (
      objectExist(nextMovePosition, OBJECT_TYPE.WALL) ||
      objectExist(nextMovePosition, OBJECT_TYPE.GHOSTLAIR)
    ) {
      nextMovePosition = this.position;
    }

    return {
      nextMovePosition,
      direction: this.direction,
    };
  }

  makemove() {
    const classesToRemove = [OBJECT_TYPE.PACMAN];
    const classesToAdd = [OBJECT_TYPE.PACMAN];

    return { classesToRemove, classesToAdd };
  }

  setNewPosition(nextMovePosition) {
    this.positon = nextMovePosition;
  }

  handleKeyInput(e, objectExist) {
    console.log(e);
    let direction;

    if (e.keyCode >= 37 && e.keyCode <= 40) {
      direction = DIRECTIONS[e.key];
    } else {
      return;
    }

    const nextMovePosition = this.position + direction.movement;
    if (objectExist(nextMovePosition, OBJECT_TYPE.WALL)) return;
    this.direction = direction;
  }
}

export default Pacman;
