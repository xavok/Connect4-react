import './Cell.css';
import React, {Component} from "react";
import {connect} from "react-redux";
import styled, {keyframes} from 'styled-components';


class MovingCell extends Component {
    render() {
        let color = '', transfer = 10;
        const {game} = this.props;
        if (game.currentPlayer === 1 || game.winner === 2) {
            color = 'red';
        } else if (game.currentPlayer === 2 || game.winner === 1) {
            color = 'black';
        }
        if(game.winner !== 0) transfer = -35;
        const keyFrameExampleOne = keyframes`
                    0%   {background: ${color}; top: 0px;left: ${game.movingCell.x - 10}px}
                    100% {background: ${color}; top: ${game.movingCell.y - transfer}px; left: ${game.movingCell.x - 10}px}
                `;
        const Box = styled.div`
                        position:fixed;
                        animation: ${keyFrameExampleOne} 0.5s 1 linear forwards;
                    `;
        if(game.movingCell.x && game.currentPlayer !== 0) {
            return <Box className="cell moving"></Box>;
        } else
        return (
            <div style={{display: 'none'}}>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {game: state.game};
};
export default connect(mapStateToProps, {})(MovingCell);
