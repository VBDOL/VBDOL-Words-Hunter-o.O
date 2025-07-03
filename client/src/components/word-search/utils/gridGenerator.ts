export function generateWordSearchGrid(words: string[], gridSize: number) {
  const grid: string[][] = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
  const wordPositions: Array<{
    word: string;
    cells: Array<{ row: number; col: number }>;
  }> = [];

  // Directions: horizontal, vertical, diagonal
  const directions = [
    { row: 0, col: 1 },   // horizontal right
    { row: 1, col: 0 },   // vertical down
    { row: 1, col: 1 },   // diagonal down-right
    { row: 1, col: -1 },  // diagonal down-left
    { row: 0, col: -1 },  // horizontal left
    { row: -1, col: 0 },  // vertical up
    { row: -1, col: -1 }, // diagonal up-left
    { row: -1, col: 1 },  // diagonal up-right
  ];

  // Place words in the grid
  words.forEach(word => {
    const upperWord = word.toUpperCase();
    let placed = false;
    let attempts = 0;

    while (!placed && attempts < 100) {
      const direction = directions[Math.floor(Math.random() * directions.length)];
      const startRow = Math.floor(Math.random() * gridSize);
      const startCol = Math.floor(Math.random() * gridSize);

      if (canPlaceWord(grid, upperWord, startRow, startCol, direction, gridSize)) {
        const cells = placeWord(grid, upperWord, startRow, startCol, direction);
        wordPositions.push({
          word: word.toLowerCase(),
          cells
        });
        placed = true;
      }
      attempts++;
    }
  });

  // Fill empty cells with random letters
  fillEmptyCells(grid, gridSize);

  return { grid, wordPositions };
}

function canPlaceWord(
  grid: string[][], 
  word: string, 
  startRow: number, 
  startCol: number, 
  direction: { row: number; col: number },
  gridSize: number
): boolean {
  for (let i = 0; i < word.length; i++) {
    const row = startRow + i * direction.row;
    const col = startCol + i * direction.col;

    if (row < 0 || row >= gridSize || col < 0 || col >= gridSize) {
      return false;
    }

    if (grid[row][col] !== '' && grid[row][col] !== word[i]) {
      return false;
    }
  }

  return true;
}

function placeWord(
  grid: string[][], 
  word: string, 
  startRow: number, 
  startCol: number, 
  direction: { row: number; col: number }
): Array<{ row: number; col: number }> {
  const cells = [];

  for (let i = 0; i < word.length; i++) {
    const row = startRow + i * direction.row;
    const col = startCol + i * direction.col;
    grid[row][col] = word[i];
    cells.push({ row, col });
  }

  return cells;
}

function fillEmptyCells(grid: string[][], gridSize: number) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (grid[row][col] === '') {
        grid[row][col] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }
}