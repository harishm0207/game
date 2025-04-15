// script.js

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');

// Handle cell click
function handleClick(event) {
    const index = event.target.getAttribute('data-cell-index');

    // If the cell is already taken or the game is over, do nothing
    if (board[index] !== '' || gameOver) return;

    // Mark the cell with the current player's symbol
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    // Add a slight animation when a player makes a move
    event.target.classList.add('move');

    // Check for a winner
    if (checkWinner()) {
        status.textContent = `Player ${currentPlayer} wins!`;
        gameOver = true;
        return;
    }

    // Check for a draw
    if (board.every(cell => cell !== '')) {
        status.textContent = 'It\'s a draw!';
        gameOver = true;
        return;
    }

    // Switch to the next player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
}

// Check for a winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], // Row 1
        [3, 4, 5], // Row 2
        [6, 7, 8], // Row 3
        [0, 3, 6], // Column 1
        [1, 4, 7], // Column 2
        [2, 5, 8], // Column 3
        [0, 4, 8], // Diagonal 1
        [2, 4, 6], // Diagonal 2
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

// Reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('move');
    });
    status.textContent = `Player ${currentPlayer}'s turn`;
}

// Add event listeners for cell clicks and reset button
cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
