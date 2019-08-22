import {combineReducers} from 'redux';
import gameReducer from "./gameReducer";
import {reducer as form } from 'redux-form';
export default combineReducers({
    game: gameReducer,
    form
});