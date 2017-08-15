import React, {Component} from 'react';
import LoginForm from './LoginForm';
import {login} from '../../models/user';
import observer from '../../models/observer';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            inputDisabled: false
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSumbitHandler = this.onSumbitHandler.bind(this);
        this.onLoginSuccess = this.onLoginSuccess.bind(this);
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
        login(this.state.username, this.state.password, this.onLoginSuccess);
    }

    onLoginSuccess(response) {
        this.setState({
            inputDisabled: false
        });
        if (response) {
            observer.onSessionUpdate();
            this.context.router.push("/");
            observer.showSuccess("Login successful!")
        }
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <LoginForm
                    username={this.state.username}
                    password={this.state.password}
                    onChange={this.onChangeHandler}
                    onSubmit={this.onSumbitHandler}
                    inputDisabled={this.state.inputDisabled}
                />
            </div>
        )
    }
}

LoginPage.contextTypes = {
    router: React.PropTypes.object
};


