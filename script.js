let board = ['', '', '', '', '', '', '', '', '']; // Tracks the state of the board
let currentPlayer = 'X'; // Tracks the current player ('X' or 'O')
let isGameOver = false; // Whether the game is over
let isPlayingAgainstAI = false; // Whether the game is against AI

const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restartBtn');
const playModeButton = document.getElementById('playModeBtn');

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameOver = false;
    updateBoard();
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

function handleCellClick(index) {
    if (board[index] || isGameOver) return; // Ignore if cell is already filled or game is over
    board[index] = currentPlayer;
    updateBoard();
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Switch player
    if (!isGameOver && isPlayingAgainstAI && currentPlayer === 'O') {
        aiMove(); // AI makes its move
    } else {
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function updateBoard() {
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];
    
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            isGameOver = true;
            statusDisplay.textContent = `Player ${board[a]} wins!`;
            return;
        }
    }

    if (!board.includes('')) {
        isGameOver = true;
        statusDisplay.textContent = 'It\'s a draw!';
    }
}

function aiMove() {
    const availableMoves = board.map((cell, index) => (cell === '' ? index : null)).filter(index => index !== null);
    const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    handleCellClick(randomMove);
}

function togglePlayMode() {
    isPlayingAgainstAI = !isPlayingAgainstAI;
    if (isPlayingAgainstAI) {
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    } else {
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
    restartGame();
}

// Event listeners
cells.forEach(cell => {
    cell.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        handleCellClick(index);
    });
});

restartButton.addEventListener('click', restartGame);
playModeButton.addEventListener('click', togglePlayMode);

restartGame(); // Initialize the game when the page loads
