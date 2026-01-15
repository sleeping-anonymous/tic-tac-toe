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
        players[0].name === "" ? "Player One" : name1;
        players[1].name === "" ? "Player Two" : name2;
    }

    const winCon = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    const checkWin = () => {

    }

    const getActivePlayer = () => {
        return turn;
    }

    return { switchTurn, setNames, getActivePlayer }
})()




