import React, {Component} from 'react';
import RegisterForm from './RegisterForm';
import {register} from '../../models/user';
import observer from '../../models/observer';

export default class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            repeat: "",
            inputDisabled: false
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSumbitHandler = this.onSumbitHandler.bind(this);
        this.onRegisterSuccess = this.onRegisterSuccess.bind(this);
    }

    onChangeHandler(event) {
        event.preventDefault();
        let newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    }

    onSumbitHandler(event) {
        event.preventDefault();
        this.setState({
            inputDisabled: true
        });
        if (this.state.password !== this.state.repeat) {
            this.setState({
                inputDisabled: false
            });
            alert("Password do not match!");
        } else {
            register(this.state.username, this.state.password, this.onRegisterSuccess);
        }
    }

    onRegisterSuccess(result) {
        this.setState({
            inputDisabled: false
        });
        observer.onSessionUpdate();
        this.context.router.push("/");
    }

    render() {
        if (sessionStorage.getItem("username"))  this.context.router.push("/");
        return (
            <div>
                <h1>Register Page</h1>
                <RegisterForm
                    username={this.state.username}
                    password={this.state.password}
                    repeat={this.state.repeat}
                    onChange={this.onChangeHandler}
                    onSubmit={this.onSumbitHandler}
                    inputDisabled={this.state.inputDisabled}
                />
            </div>
        );
    }
}

RegisterPage.contextTypes = {
    router: React.PropTypes.object
};