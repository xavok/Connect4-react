import {ASSIGN_CELL, NEW_GAME, PLAYER_NAMES} from "../actions/types";
import _ from "lodash";

const emptyBoard = _.range(7).map(() => _.times(6, _.constant(0)));
const INITIAL_STATE = {
    playerOne: null,
    playerTwo: null,
    currentPlayer: 1,
    board: emptyBoard,
    winner: 0,
    movingCell: {}
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PLAYER_NAMES:
            return {...state, playerOne: action.payload.playerOne, playerTwo: action.payload.playerTwo};
        case ASSIGN_CELL:
            //Prevent any changes if winner is decided
            if(state.winner !==0) return {...state,currentPlayer: 0};
            //get values from payload and state
            let {column,row,cell} = action.payload;
            let {currentPlayer, board} = state;
            let add =0;
            //get index of the lowest cell in the column
            const index = state.board[column].findIndex(i => i === 0);
            //assign number of the current player to the cell
            state.board[column][index] = currentPlayer;
            //decide by how much you have to move animation. This is checking which cell was clicked
            // and if it's not the same one that is lowest open add 80 for each cell.
            if(index !== row) {
                add = (row-index) * 80;
            }

            //get cell that user clicked on and add additional px to the y value.
            const movingCell = cell.current.getBoundingClientRect();
            movingCell.y +=add;

            //checking if we have a winner
            //setting what winning value looks like for current player
            let winString = Array.apply(null, Array(4).fill(state.currentPlayer)).join(',');
            let columnWin = board[column].join(',').includes(winString);
            let rowWin = board.map(column => column[index]).join(',').includes(winString);
            let diagonalUp = board.map((l, i) => l[index + (i - column)]).join(',').includes(winString);
            let diagonalDown = board.map((l, i) => l[index - (i - column)]).join(',').includes(winString);

            //returning winner if one is found
            if (columnWin || rowWin || diagonalUp || diagonalDown) {
                return { ...state , winner: currentPlayer, currentPlayer: -1, movingCell };
            }
            //checking if there are any empty cells
            let cellCheck = board.map(col => col.join(',')).join(',').includes('0');
            //if all cells are empty return draw.
            if (!cellCheck) {
                return { ...state, currentPlayer: 0,movingCell };
            }
            //otherwise change player
            return {...state, currentPlayer: currentPlayer % 2 + 1, movingCell };
        case NEW_GAME:
            //restart the game
            return {...INITIAL_STATE, board: _.range(7).map(() => _.times(6, _.constant(0)))};
        default:
            return state;
    }
}