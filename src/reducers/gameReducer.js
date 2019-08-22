import {ASSIGN_CELL, PLAYER_NAMES} from "../actions/types";
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
            let {column,row,cell} = action.payload;
            let {currentPlayer, board} = state;
            const index = state.board[column].findIndex(i => i === 0);
            state.board[column][index] = currentPlayer;
            let add =0;
            if(index !== row) {
                add = (row-index) * 70;
            }

            const movingCell = cell.current.getBoundingClientRect();
            movingCell.y +=add;
            // Find if have winner
            let winString = Array.apply(null, Array(4).fill(state.currentPlayer)).join(',');
            let columnWin = board[column].join(',').includes(winString);
            let rowWin = board.map(column => column[index]).join(',').includes(winString);
            let diagonalUp = board.map((l, i) => l[index + (i - column)]).join(',').includes(winString);
            let diagonalDown = board.map((l, i) => l[index - (i - column)]).join(',').includes(winString);

            if (columnWin || rowWin || diagonalUp || diagonalDown) {
                return { ...state , winner: currentPlayer, currentPlayer: 0 };
            }


            // Find draw case
            let noMoreEmptyCell = !board.map(col => col.join(',')).join(',').includes('0');
            if (noMoreEmptyCell) {
                return { ...state, currentPlayer: 0 };
            }
            return {...state, currentPlayer: currentPlayer % 2 + 1, movingCell };
        default:
            return state;
    }
}