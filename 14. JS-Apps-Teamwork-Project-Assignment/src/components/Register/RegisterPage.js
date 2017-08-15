import React, {Component} from 'react';
import RegisterForm from './RegisterForm';
import {register} from '../../models/user';
import observer from '../../models/observer';

export default class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            repeat: '',
            fullName: '',
            email: '',
            phone: '',
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
        if(this.state.username.length < 3){
            observer.showError("Username must be at least 3 symbols long.");
            return;
        }
        if(this.state.password.length < 3){
            observer.showError("Password must be at least 3 symbols long.");
            return;
        }
        this.setState({
            inputDisabled: true
        });
        if (this.state.password !== this.state.repeat) {
            this.setState({
                inputDisabled: false
            });
            observer.showError("Passwords don't match!");
        } else {
            register(
                this.state.username,
                this.state.password,
                this.state.fullName,
                this.state.email,
                this.state.phone,
                this.onRegisterSuccess
            );
        }
    }

    onRegisterSuccess(result) {
        this.setState({
            inputDisabled: false
        });
        observer.onSessionUpdate();
        this.context.router.push("/");
        observer.showSuccess("Registration successful!");
    }

    render() {
        return (
            <div>
                <h1>Register User</h1>
                <RegisterForm
                    username={this.state.username}
                    password={this.state.password}
                    repeat={this.state.repeat}
                    name={this.state.fullName}
                    email={this.state.email}
                    phone={this.state.phone}
                    onChange={this.onChangeHandler}
                    onSubmit={this.onSumbitHandler}
                    inputDisabled={this.state.inputDisabled}
                />
            </div>
        )
    }
}

RegisterPage.contextTypes = {
    router: React.PropTypes.object
};


