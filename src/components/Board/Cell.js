import './Cell.css';
import React, {useRef} from "react";
import {connect} from "react-redux";
import {assignCell} from '../../actions';

const Cell = (props) => {
    const ref1 = useRef(null);
    let color = 'cell';
    if (props.game.board[props.column][props.row] === 1) {
        color += ' black';
    } else if (props.game.board[props.column][props.row] === 2) {
        color += ' red';
    }
    return (
        <div ref={ref1} className={color} onClick={() => {
            props.assignCell({row: props.row, column: props.column, cell: ref1})
        }}>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {game: state.game};
};
export default connect(mapStateToProps, {assignCell})(Cell);
