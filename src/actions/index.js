import {PLAYER_NAMES, ASSIGN_CELL,NEW_GAME} from "./types";

export const playerNames = (formValues) => {
    return {
        type: PLAYER_NAMES,
        payload: formValues
    };
};

export const assignCell = ({column,row,cell}) => {
    return {
        type: ASSIGN_CELL,
        payload: {
            column,
            row,
            cell
        }
    };
};

export const newGame = () => {
    return {
        type: NEW_GAME,
        payload: {}
    };
};