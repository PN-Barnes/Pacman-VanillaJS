import { OBJECT_TYPE } from './setup';

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
  }
}
