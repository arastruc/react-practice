export const WIN_CONDITIONS = [
  ["0-0", "0-1", "0-2"], // Top row
  ["1-0", "1-1", "1-2"], // Middle row
  ["2-0", "2-1", "2-2"], // Bottom row
  ["0-0", "1-0", "2-0"], // Left column
  ["0-1", "1-1", "2-1"], // Middle column
  ["0-2", "1-2", "2-2"], // Right column
  ["0-0", "1-1", "2-2"], // Left-to-right diagonal
  ["0-2", "1-1", "2-0"], // Right-to-left diagonal
];

export const INITIAL_GAMEBOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export const INITIAL_PLAYER = {
  O: "Player 2",
  X: "Player 1",
};
