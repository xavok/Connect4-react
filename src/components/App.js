import React, {Component} from "react";
import Header from "./Header";
import PlayerForm from "./PlayerForm";
import {playerNames} from "../actions";
import {connect} from "react-redux";
import Board from "./Board/Board";
import {newGame} from "../actions";

class App extends Component {
    onSubmit = (formValues) => {
        this.props.playerNames(formValues);
    };

    renderBoard = () => {
        const {playerOne, playerTwo} = this.props.game;
        if(playerOne && playerTwo) {
            return <Board/>;
        } else {
            return <PlayerForm onSubmit={this.onSubmit}/>
        }
    }

    renderRestart = () => {
        if(this.props.game.winner !== 0) {
            return <button onClick={this.props.newGame} className="ui button primary fluid" style={{margin: "10px"}}>Restart</button>
        }
    };

    render() {
        return (
            <div className="ui container" style={{textAlign: "center"}}>
                <Header/>
                {this.renderBoard()}
                {this.renderRestart()}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {game: state.game};
};
export default connect(mapStateToProps, {playerNames,newGame})(App);
