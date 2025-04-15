const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Store game state
let gameState = {
    board: ['', '', '', '', '', '', '', '', ''],
    currentPlayer: 'X',
    gameOver: false,
};

// Endpoint to get the current game state
app.get('/game', (req, res) => {
    res.json(gameState);
});

// Endpoint to make a move
app.post('/game/move', (req, res) => {
    const { index } = req.body;

    if (gameState.board[index] !== '' || gameState.gameOver) {
        return res.status(400).json({ message: 'Invalid move' });
    }

    gameState.board[index] = gameState.currentPlayer;

    // Check for winner or draw
    if (checkWinner()) {
        gameState.gameOver = true;
        return res.json({ message: `Player ${gameState.currentPlayer} wins!`, gameState });
    }

    if (gameState.board.every(cell => cell !== '')) {
        gameState.gameOver = true;
        return res.json({ message: 'It\'s a draw!', gameState });
    }

    // Switch players
    gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
    res.json({ message: `Player ${gameState.currentPlayer}'s turn`, gameState });
});

// Endpoint to reset the game
app.post('/game/reset', (req, res) => {
    gameState = {
        board: ['', '', '', '', '', '', '', '', ''],
        currentPlayer: 'X',
        gameOver: false,
    };
    res.json({ message: 'Game reset!', gameState });
});

// Simple function to check for a winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameState.board[a] && gameState.board[a] === gameState.board[b] && gameState.board[a] === gameState.board[c];
    });
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
