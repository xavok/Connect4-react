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
            if(state.winner !==0) return {...state,currentPlayer: 0};
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

            let winString = Array.apply(null, Array(4).fill(state.currentPlayer)).join(',');
            let columnWin = board[column].join(',').includes(winString);
            let rowWin = board.map(column => column[index]).join(',').includes(winString);
            let diagonalUp = board.map((l, i) => l[index + (i - column)]).join(',').includes(winString);
            let diagonalDown = board.map((l, i) => l[index - (i - column)]).join(',').includes(winString);

            if (columnWin || rowWin || diagonalUp || diagonalDown) {
                return { ...state , winner: currentPlayer, currentPlayer: -1, movingCell };
            }

            let emptyCellCheck= !board.map(col => col.join(',')).join(',').includes('0');
            if (emptyCellCheck) {
                return { ...state, currentPlayer: 0,movingCell };
            }
            return {...state, currentPlayer: currentPlayer % 2 + 1, movingCell };
        case NEW_GAME:
            return {...INITIAL_STATE, board: _.range(7).map(() => _.times(6, _.constant(0)))};
        default:
            return state;
    }
}