import React, {Component} from "react";
import {connect} from "react-redux";

class Header extends Component {

    renderWinner = () => {
        const {winner, playerOne,playerTwo,currentPlayer} = this.props.game;
        if(currentPlayer ===0 && winner ===0) return 'Draw';
        return winner !== 0 ? (winner === 1) ? `${playerOne} won` :  `${playerTwo} won` : '';
    };

    render() {
        return (
            <div className="ui pointing">
                <h1 className="ui center aligned icon header">Connect 4</h1>
                <h2 className="ui center aligned icon header">{this.renderWinner()}</h2>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {game: state.game};
};
export default connect(mapStateToProps, {})(Header);
