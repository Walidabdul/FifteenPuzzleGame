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
}
