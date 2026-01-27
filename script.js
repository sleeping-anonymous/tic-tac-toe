// GameBoard module using IIFE

const GameBoard = (function () {
    const board = ["", "", "", "", "", "", "", "", ""]

    const placeMarker = (mark, idx) => {
        if (board[idx] === "") {
            board[idx] = mark;
            return true;
        }
        return false;
    }

    const viewBoard = () => board;

    const resetBoard = () => board.fill("");

    return { placeMarker, viewBoard, resetBoard };
})()


//  player factory

const Player = (name, marker) => {
    return { name, marker };
}


// Game Controller IIFE
const GameController = (function () {

    let players = [Player("player1", "X"),
    Player("player2", "O")
    ]

    let turn = players[0];

    const switchTurn = () => {
        turn = turn === players[0] ? players[1] : players[0];
    }

    const setNames = (name1, name2) => {
        players[0].name = name1 || "Player One";
        players[1].name = name2 || "Player Two";
    }

    const winCon = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    const checkWin = (board) => {
        for (const condition of winCon) {
            const [num1, num2, num3] = condition;
            if (board[num1] && board[num1] === board[num2] && board[num1] === board[num3]) {
                return true;
            }
        }
        return false;
    }

    const checkTie = (board) => {
        for (let idx = 0; idx < 9; idx++) {
            if (board[idx] === "") return false;
        }
        return true;
    }

    const getActivePlayer = () => {
        return turn;
    }

    let gameOver = false;

    const playRound = () => {
        console.log("Current board:", GameBoard.viewBoard());
        while (!gameOver) {
            let mark = turn.marker;
            console.log("Turn:", turn.name);
            // const idx = Number(prompt("Enter index:"));

            if (idx < 0 || idx > 8 || Number.isNaN(idx)) {
                console.log("Enter a number between 0 and 8");
                continue;
            }

            const success = GameBoard.placeMarker(mark, idx);

            if (!success) {
                console.log("ALready There");
                continue;
            }
            else {
                console.log("Marked");
            }

            const board = GameBoard.viewBoard();

            console.log(board);

            if (checkWin(GameBoard.viewBoard())) {
                gameOver = true;
                console.log(turn.name, "won");
                return;
            }
            if (checkTie(GameBoard.viewBoard())) {
                gameOver = true;
                console.log("Game Tied.");
                return;
            }

            switchTurn();
        }
    }

    const newGame = () => {
        GameBoard.resetBoard();
        gameOver = false;
        turn = players[0];
        playRound();
    }

    return { switchTurn, setNames, getActivePlayer, checkWin, checkTie, playRound, newGame }
})()


// GameController.newGame();

const boardDiv = document.querySelector(".game-board");

function renderBoard() {
    boardDiv.innerHTML = "";
    const board = GameBoard.viewBoard();

    board.forEach((value, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = index;
        cell.textContent = value;
        boardDiv.appendChild(cell);
    });
}

renderBoard();

