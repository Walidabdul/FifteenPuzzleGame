document.addEventListener('DOMContentLoaded', function () { 
    new FifteenPuzzle();
});

class FifteenPuzzle {
    constructor() {
        this.boardSize = 4;
        this.tileCount = this.boardSize * this.boardSize - 1;
        this.emptyRow = this.boardSize - 1;
        this.emptyCol = this.boardSize - 1;
        this.board = [];
        this.gameStartTime = null;
        this.moveCount = 0;
        this.timer = null;

        this.initializeBoard();
        this.setupEventListeners();
        this.startTimer();
        this.randomizeBackground();
    }

    initializeBoard() {
        const board = document.getElementById('puzzle-board');
        board.innerHTML = '';

        let tileNumber = 1;
        for (let row = 0; row < this.boardSize; row++) {
            for (let col = 0; col < this.boardSize; col++) {
                if (row === this.emptyRow && col === this.emptyCol) {
                    const emptyTile = document.createElement('div');
                    emptyTile.className = 'puzzle-tile empty-tile';
                    emptyTile.dataset.row = row;
                    emptyTile.dataset.col = col;
                    board.appendChild(emptyTile);
                    continue;
                }

                const tile = document.createElement('div');
                tile.className = 'puzzle-tile';
                tile.textContent = tileNumber;
                tile.dataset.row = row;
                tile.dataset.col = col;
                tile.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;

                tile.addEventListener('mouseover', () => this.highlightMovableTile(tile));
                tile.addEventListener('mouseout', () => this.resetTileStyle(tile));
                tile.addEventListener('click', () => this.moveTile(tile));

                board.appendChild(tile);
                tileNumber++;
            }
        }
    }

    highlightMovableTile(tile) {
        const tileRow = parseInt(tile.dataset.row);
        const tileCol = parseInt(tile.dataset.col);

        if (this.canMove(tileRow, tileCol)) {
            tile.classList.add('movable-piece');
        }
    }

    resetTileStyle(tile) {
        tile.classList.remove('movable-piece');
    }

    canMove(row, col) {
        return (
            (row === this.emptyRow && Math.abs(col - this.emptyCol) === 1) ||
            (col === this.emptyCol && Math.abs(row - this.emptyRow) === 1)
        );
    }

    moveTile(tile) {
        const tileRow = parseInt(tile.dataset.row);
        const tileCol = parseInt(tile.dataset.col);

        if (this.canMove(tileRow, tileCol)) {
            const emptyTile = document.querySelector('.empty-tile');
            
            tile.style.backgroundPosition = `-${this.emptyCol * 100}px -${this.emptyRow * 100}px`;
            tile.dataset.row = this.emptyRow;
            tile.dataset.col = this.emptyCol;

            emptyTile.style.backgroundPosition = `-${tileCol * 100}px -${tileRow * 100}px`;
            emptyTile.dataset.row = tileRow;
            emptyTile.dataset.col = tileCol;

            this.emptyRow = tileRow;
            this.emptyCol = tileCol;

            this.incrementMoves();
            this.checkWinCondition();
        }
    }

    shuffle() {
        for (let i = 0; i < 500; i++) {
            const possibleMoves = this.getPossibleMoves();
            const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
            this.moveTileToEmptySpace(randomMove[0], randomMove[1]);
        }
    }

    getPossibleMoves() {
        const moves = [];
        const directions = [
            [0, 1], [0, -1], [1, 0], [-1, 0]
        ];

        for (let dir of directions) {
            const newRow = this.emptyRow + dir[0];
            const newCol = this.emptyCol + dir[1];

            if (newRow >= 0 && newRow < this.boardSize && 
                newCol >= 0 && newCol < this.boardSize) {
                moves.push([newRow, newCol]);
            }
        }

        return moves;
    }

    moveTileToEmptySpace(row, col) {
        const tile = document.querySelector(`.puzzle-tile[data-row="${row}"][data-col="${col}"]`);
        if (tile) {
            tile.style.backgroundPosition = `-${this.emptyCol * 100}px -${this.emptyRow * 100}px`;
            tile.dataset.row = this.emptyRow;
            tile.dataset.col = this.emptyCol;

            this.emptyRow = row;
            this.emptyCol = col;
        }
    }

    checkWinCondition() {
        const tiles = document.querySelectorAll('.puzzle-tile');
        let isWin = true;

        tiles.forEach(tile => {
            if (!tile.classList.contains('empty-tile')) {  
                const number = parseInt(tile.textContent);
                const currentRow = parseInt(tile.dataset.row);
                const currentCol = parseInt(tile.dataset.col);

                const expectedRow = Math.floor((number - 1) / this.boardSize);
                const expectedCol = (number - 1) % this.boardSize;

                if (currentRow !== expectedRow || currentCol !== expectedCol) {
                    isWin = false;
                }
            }
        });
        if (isWin) {
            this.showWinNotification();
        }
    }

    showWinNotification() {
        this.stopTimer();
        const winNotification = document.getElementById('win-notification');
        const finalTime = document.getElementById('final-time');
        const finalMoves = document.getElementById('final-moves');

        finalTime.textContent = Math.floor((Date.now() - this.gameStartTime) / 1000);
        finalMoves.textContent = this.moveCount;

        winNotification.classList.remove('hidden');
    }

    startTimer() {
        this.gameStartTime = Date.now();
        this.moveCount = 0;
        document.getElementById('game-time').textContent = '0';
        document.getElementById('move-count').textContent = '0';

        this.timer = setInterval(() => {
            const elapsedTime = Math.floor((Date.now() - this.gameStartTime) / 1000);
            document.getElementById('game-time').textContent = elapsedTime;
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timer);
    }

    incrementMoves() {
        this.moveCount++;
        document.getElementById('move-count').textContent = this.moveCount;
    }

    setupEventListeners() {
        document.getElementById('shuffle-btn').addEventListener('click', () => {
            this.shuffle();
            this.startTimer();
        });

        document.getElementById('solve-btn').addEventListener('click', () => {
            this.solvePuzzle();
        });

        document.getElementById('background-choice').addEventListener('change', (event) => {
            this.changeBackground(event.target.value);
        });
    }

    randomizeBackground() {
        const backgrounds = ['background1.png', 'background2.png', 'background3.png', 'background4.png'];
        const randomBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
        this.changeBackground(randomBackground);
        document.getElementById('background-choice').value = randomBackground;
    }

    changeBackground(backgroundImage) {
        const tiles = document.querySelectorAll('.puzzle-tile');
        tiles.forEach(tile => {
            tile.style.backgroundImage = `url(${backgroundImage})`;
            const row = parseInt(tile.dataset.row);
            const col = parseInt(tile.dataset.col);
            tile.style.backgroundPosition = `-${col * 100}px -${row * 100}px`;
        });
    }
}
