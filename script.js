// Initialize game variables
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Wait for the DOM to load before running the script
document.addEventListener('DOMContentLoaded', () => {
  createBoard();
});

// Create the game board
function createBoard() {
  const uiTablero = document.getElementById('uiTablero');
  uiTablero.innerHTML = ''; // Clear existing content
  for (let i = 0; i < 3; i++) {
    const fila = document.createElement('div');
    fila.className = 'fila';
    for (let j = 0; j < 3; j++) {
      const celda = document.createElement('button');
      celda.className = 'celda';
      celda.id = `b${i}-${j}`;
      celda.setAttribute('data-row', i);
      celda.setAttribute('data-col', j);
      celda.addEventListener('click', handleCellClick);
      fila.appendChild(celda);
    }
    uiTablero.appendChild(fila);
  }
  
  // Add reset button
  const resetButton = document.createElement('button');
  resetButton.id = 'resetear';
  resetButton.textContent = 'RESET';
  resetButton.addEventListener('click', resetGame);
  uiTablero.appendChild(resetButton);
  
  // Add print div for game status
  const printDiv = document.createElement('div');
  printDiv.id = 'print';
  uiTablero.appendChild(printDiv);
  
  resetGame(); // Initialize the game state
}

// Handle cell click
function handleCellClick(event) {
  const cell = event.target;
  const row = parseInt(cell.getAttribute('data-row'));
  const col = parseInt(cell.getAttribute('data-col'));
  const index = row * 3 + col;

  if (gameBoard[index] === '' && gameActive) {
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    if (checkWin()) {
      document.getElementById('print').textContent = `Player ${currentPlayer} wins!`;
      gameActive = false;
    } else if (gameBoard.every(cell => cell !== '')) {
      document.getElementById('print').textContent = "It's a draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      document.getElementById('print').textContent = `Player ${currentPlayer}'s turn`;
    }
  }
}

// Check for a win
function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
  });
}

// Reset the game
function resetGame() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  document.getElementById('print').textContent = "Player X's turn";
  document.querySelectorAll('.celda').forEach(cell => {
    cell.textContent = '';
  });
}