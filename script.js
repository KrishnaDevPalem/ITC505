// Initialize the game grid
const gridSize = 5;
let gameGrid = Array.from({ length: gridSize }, () => Array(gridSize).fill(false));

// Create the game board
const gameContainer = document.getElementById('game-container');
gameGrid.forEach((row, rowIndex) => {
  row.forEach((cell, colIndex) => {
    const cellElement = document.createElement('div');
    cellElement.classList.add('cell');
    cellElement.addEventListener('click', () => handleCellClick(rowIndex, colIndex));
    gameContainer.appendChild(cellElement);
  });
});

// Randomly toggle some cells to start the game
for (let i = 0; i < 5; i++) {
  const randomRow = Math.floor(Math.random() * gridSize);
  const randomCol = Math.floor(Math.random() * gridSize);
  handleCellClick(randomRow, randomCol);
}

// Function to handle cell clicks
function handleCellClick(row, col) {
  toggleCell(row, col);
  toggleCell(row - 1, col);
  toggleCell(row + 1, col);
  toggleCell(row, col - 1);
  toggleCell(row, col + 1);

  // Check if the player has won
  if (gameGrid.every(row => row.every(cell => !cell))) {
    window.alert('You win!');
    resetGame();
  }
}

// Function to toggle a cell and update its appearance
function toggleCell(row, col) {
  if (row >= 0 && row < gridSize && col >= 0 && col < gridSize) {
    gameGrid[row][col] = !gameGrid[row][col];
    const cellElement = gameContainer.children[row * gridSize + col];
    cellElement.style.backgroundColor = gameGrid[row][col] ? '#ddd' : '#eee';
  }
}

// Function to reset the game
function resetGame() {
  gameGrid = Array.from({ length: gridSize }, () => Array(gridSize).fill(false));
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.style.backgroundColor = '#eee';
  });
}
