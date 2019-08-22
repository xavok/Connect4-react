import React, {Component} from "react";
import Header from "./Header";
import PlayerForm from "./PlayerForm";
import {playerNames} from "../actions";
import {connect} from "react-redux";
import Board from "./Board/Board";

class App extends Component {
    onSubmit = (formValues) => {
        this.props.playerNames(formValues);
    };

    renderBoard = () => {
        const {playerOne, playerTwo} = this.props.game;
        if(playerOne && playerTwo) {
            return <Board/>;
        } else {
            return <Board/>
            // return <PlayerForm onSubmit={this.onSubmit}/>
        }
    }

    render() {
        return (
            <div className="ui container">
                <Header/>
                {this.renderBoard()}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {game: state.game};
};
export default connect(mapStateToProps, {playerNames})(App);
