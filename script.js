"use strict";

const displayStatus = document.querySelector(".game--status");
let gameActive = true;
let currPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const winningMessage = () => `Player ${currPlayer} won!`;
const drawMessage = () => `Game ended in a draw!`;
const currPlayerTurn = () => `It is ${currPlayer} turn!`;

displayStatus.innerHTML = currPlayerTurn();

const handleCellPlayed = (clickedCell, cellIndex) => {
    gameState[cellIndex] = currPlayer;
    clickedCell.innerHTML = currPlayer;
};

const handlePlayerChange = () => {};
const handleResultValidation = () => {
    let roundWon = false;
    for(let i = 0; i < 8; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') continue;
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    if(roundWon) {
        displayStatus.innerHTML = winningMessage;
        gameActive = false;
        return;
    }

    // continue with draw
};

const handleCellClick = (e) => {
  const clickedCell = e.target;
  const cellIndex = parseInt(clickedCell.getAttribute("data-cell-index"));
  if (gameState[cellIndex] !== "" || !gameActive) return;
  handleCellPlayed(clickedCell, cellIndex);
  handleResultValidation();
};
const handleRestartGame = () => {};

document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));
document
  .querySelector(".game--restart")
  .addEventListener("click", handleRestartGame);
