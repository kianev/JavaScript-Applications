import React, {Component} from 'react';
import CreateForm from './CreateForm';
import {create} from '../../models/post';
import observer from '../../models/observer';

export default class CreatePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            inputDisabled: false
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSumbitHandler = this.onSumbitHandler.bind(this);
        this.onCreateSuccess = this.onCreateSuccess.bind(this);
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
        create(this.state.title, this.state.content, this.onCreateSuccess);
    }

    onCreateSuccess(result) {
        this.context.router.push("/posts");
        observer.showSuccess("Post created!");
    }

    render() {
        return (
            <div>
                <h1>Create Post</h1>
                <CreateForm
                    title={this.state.title}
                    content={this.state.content}
                    onChange={this.onChangeHandler}
                    onSubmit={this.onSumbitHandler}
                    inputDisabled={this.state.inputDisabled}
                />
            </div>
        )
    }
}

CreatePage.contextTypes = {
    router: React.PropTypes.object
};


