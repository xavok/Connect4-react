import './Board.css';
import React, {Component} from "react";
import {connect} from "react-redux";
import Cell from "./Cell";
import MovingCell from "./MovingCell";

class Board extends Component {
    renderCell = () => {
        return this.props.game.board.map((column, columnI) => {
            const cells = column.map((row, rowI) => {
                return <Cell key={rowI} column={columnI} row={rowI}/>
            }).reverse();
            return (<div className={`column-${columnI} col`} key={columnI}>{cells}</div>);
        });
    };

    render() {
        return (
            <div className="ui board grid">
                <MovingCell/>
                {this.renderCell()}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {game: state.game};
};
export default connect(mapStateToProps, {})(Board);
