import './Cell.css';
import React, {Component} from "react";
import {connect} from "react-redux";
import styled, {keyframes} from 'styled-components';


class MovingCell extends Component {
    render() {
        let color = '';
        if (this.props.game.currentPlayer === 1) {
            color = 'red';
        } else if (this.props.game.currentPlayer === 2) {
            color = 'black';
        }
        const keyFrameExampleOne = keyframes`
                    0%   {background: ${color}; top: 0px;left: ${this.props.game.movingCell.x - 10}px}
                    100% {background: ${color}; top: ${this.props.game.movingCell.y - 10}px; left: ${this.props.game.movingCell.x - 10}px}
                `;
        const Box = styled.div`
                        position:fixed;
                        animation: ${keyFrameExampleOne} 1s 1 linear forwards;
                    `;
        if(this.props.game.movingCell.x && this.props.game.currentPlayer !== 0) {
            return <Box className="cell"></Box>;
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
