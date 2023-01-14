import { DIRECTIONS, OBJECT_TYPE } from './setup';

// Primitive Randmom Movement

export function randomMovement(position, direction, objectExist) {
  let dir = direction;

  let nextMovePos = position + dir.movement;

  // Create an array from the diretions objects keys
  const keys = Object.keys(DIRECTIONS);

  while (
    objectExist(nextMovePos, OBJECT_TYPE.WALL) ||
    objectExist(nextMovePos, OBJECT_TYPE.GHOST)
  ) {
    const key = keys[Math.floor(Math.random() * keys.length)];

    // set the next move
    dir = DIRECTIONS[key];

    nextMovePos = position + dir.movement;
  }
  return { nextMovePos, direction: dir };
}
