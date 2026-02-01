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



    const newGame = () => {
        GameBoard.resetBoard();
        gameOver = false;
        turn = players[0];
    }

    const isGameOver = () => {
        return gameOver;
    }

    const endGame = () => {
        gameOver = true;
    }

    return { switchTurn, setNames, getActivePlayer, checkWin, checkTie, newGame, isGameOver, endGame }
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

        cell.addEventListener("click", () => {
            if (GameController.isGameOver()) return;

            const player = GameController.getActivePlayer()
            const success = GameBoard.placeMarker(player.marker, index);

            if (!success) return;

            if (GameController.checkWin(GameBoard.viewBoard())) {
                document.querySelector(".message-box").textContent = `${player.name} Wins`;
                GameController.endGame();
            }
            else if (GameController.checkTie(GameBoard.viewBoard())) {
                document.querySelector(".message-box").textContent = `Game is Tied`;
                GameController.endGame();
            }
            else {
                GameController.switchTurn();
                const nextPlayer = GameController.getActivePlayer();
                document.querySelector(".message-box").textContent = `${nextPlayer.name}'s Turn`
            }

            renderBoard();   // marker is places , so rerender the board
        })
    });
}


const startbtn = document.querySelector(".start-game");
const clearBtn = document.querySelector(".clear-board");

startbtn.addEventListener("click", () => {
    boardDiv.style.display = "grid";  // it gets the board to be visible ons cren and pushes the btns down in UI

    const p1 = document.querySelector(".player1").value;
    const p2 = document.querySelector(".player2").value;
    GameController.setNames(p1, p2);

    const current = GameController.getActivePlayer();
    document.querySelector(".message-box").textContent =
        `${current.name}'s Turn`;

    GameController.newGame();
    renderBoard();
})

clearBtn.addEventListener("click", () => {
    const currPlayer = GameController.getActivePlayer();
    document.querySelector(".message-box").textContent = `${currPlayer}'s Turn`;
    GameController.newGame();
    renderBoard();
})

