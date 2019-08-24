import React, {Component} from "react";
import {Field, reduxForm} from "redux-form";

class PlayerForm extends Component {
    renderError({error,touched}) {
        if(touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }

    renderInput = ({input, label, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" style={{textAlign:"center"}}/>
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = (formValues) =>{
        this.props.onSubmit(formValues);
    };


    render() {
        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="playerOne" component={this.renderInput} label="Enter Player 1" />
                <Field name="playerTwo" component={this.renderInput} label="Enter Player 2"/>
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
};

const validate = (formValues) => {
    const errors = {};
    if(!formValues.playerOne) {
        errors.playerOne = "You must enter a player 1 name";
    }
    if(!formValues.playerTwo) {
        errors.playerTwo = "You must enter a player 2 name";
    }
    return errors;
 };
export default reduxForm({
    form: 'playerForm',
    validate
})(PlayerForm);

