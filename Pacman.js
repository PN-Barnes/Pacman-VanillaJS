import { OBJECT_TYPE, DIRECTIONS } from './setup';

class Pacman {
  constructor(speed, startPosition) {
    this.positon = startPosition;
    this.speed = speed;
    this.dir = null;
    this.timer = 0;
    this.powerPill = false;
    this.rotation = true;
  }

  shouldMove() {
    if (!this.dir) return false;
    if (this.timer === this.speed) {
      this.timer = 0;
      return true;
    }
    this.timer++;
  }

  getNextMove(objectExist) {
    let nextMovePosition = this.pos + this.dir.movement;

    if (
      objectExist(nextMovePosition, OBJECT_TYPE.WALL) ||
      objectExist(nextMovePosition, OBJECT_TYPE.GHOSTLAIR)
    ) {
      nextMovePosition = this.position;
    }

    return {
      nextMovePosition,
      direction: this.dir,
    };
  }

  makemove() {
    const classesToRemove = [OBJECT_TYPE.PACMAN];
    const classesToAdd = [OBJECT_TYPE.PACMAN];

    return { classesToRemove, classesToAdd };
  }
}
