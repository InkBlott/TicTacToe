
const gameBoard = (function () {
    let items = Array(9).fill(0);

    const reset = () => {
        for (let i = 0; i < items.length; i++) {
            items[i] = 0;
            document.getElementById(i).innerHTML = "";
        }
        document.getElementById("a").innerHTML="";
    }

    function random(u) {
        return Math.floor(Math.random() * Math.floor(u));
    }

    const getEmptySquare = () => {
        let rand = random(9);
        if (items.lastIndexOf(0) !== -1) {
            while (items[rand] !== 0) {
                rand = random(9);
            }
            return rand;
        }
        else return 11;

    }

    const getItems = () => items;

    const checkEmpty = (squareId) => {
        if (items[squareId] === 0) {
            return true;
        } else return false;
    }

    const setItemSquare = (location, value) => {
        items[location] = value;
    }

    const checkWin = (val) => {


        if ((items[0] === val && items[1] === val && items[2] === val) ||
            (items[3] === val && items[4] === val && items[5] === val) ||
            (items[6] === val && items[7] === val && items[8] === val) ||
            (items[0] === val && items[3] === val && items[6] === val) ||
            (items[1] === val && items[4] === val && items[7] === val) ||
            (items[2] === val && items[5] === val && items[8] === val) ||
            (items[0] == val && items[4] == val && items[8] == val) ||
            (items[2] == val && items[4] == val && items[6] == val)) {

                document.getElementById("a").innerHTML = val + " wins!"
                items.fill(1);

        } else if (items.lastIndexOf(0) === -1){

                document.getElementById("a").innerHTML = "Draw."
                items.fill(1);

        } else return;

    }

    return {
        getItems, checkWin, reset, setItemSquare, getEmptySquare, checkEmpty
    }

})()

const playerFactory = function (val) {
    const getVal = () => val;

    const play = (squareId) => {

        gameBoard.setItemSquare(squareId, val);
        document.getElementById(squareId).innerHTML = val;
        gameBoard.checkWin(val);

    }


    const playAi = () => {
        let square = gameBoard.getEmptySquare();
        if (square != 11) {
            gameBoard.setItemSquare(square, val);
            document.getElementById(square).innerHTML = val;
            gameBoard.checkWin(val);
        } else return;
    }

    return { getVal, play, playAi }
}
const playerX = playerFactory("X");
const playerO = playerFactory("O");
gameBoard.reset();

function set(squareId) {
    if (gameBoard.checkEmpty(squareId) === true) {
        playerX.play(squareId);
        playerO.playAi();
    } else return;

}

function reset() {
    gameBoard.reset();
}


