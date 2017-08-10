import React, {Component} from 'react';
import CreateForm from './CreateForm';
import {create} from '../../models/team';
//import observer from '../../models/observer';

export default class CreatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            inputDisabled: true
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSumbitHandler = this.onSumbitHandler.bind(this);
        this.onCreateSuccess = this.onCreateSuccess.bind(this);
    }

    onChangeHandler(event) {
        event.preventDefault();
        let newState = {};
        newState[event.target.name] = event.target.value;
        if(event.target.name === "name"){
            if(event.target.value.length < 3){
                newState.inputDisabled = true;
            }else{
                newState.inputDisabled = false;
            }
        }
        this.setState(newState);
    }

    onSumbitHandler(event) {
        event.preventDefault();
        if(this.state.name.length < 3){
            alert("Team name must be at least 3 caracters long!")
        }else{
            create(this.state.name, this.state.description, this.onCreateSuccess);
        }
    }

    onCreateSuccess(result) {
       this.context.router.push("/catalog");
    }

    render() {
        return (
            <div>
                <h1>Create Team</h1>
                <CreateForm
                    name={this.state.name}
                    description={this.state.description}
                    onChange={this.onChangeHandler}
                    onSubmit={this.onSumbitHandler}
                    inputDisabled={this.state.inputDisabled}
                />
            </div>
        );
    }
}

CreatePage.contextTypes = {
    router: React.PropTypes.object
};