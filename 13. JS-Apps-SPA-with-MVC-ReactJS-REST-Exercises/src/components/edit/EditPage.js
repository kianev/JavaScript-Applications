import React, {Component} from 'react';
import EditForm from '../edit/EditForm';
import {loadDetails} from '../../models/team';
import {edit} from '../../models/team';
//import observer from '../../models/observer';

export default class EditPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            inputDisabled: true
        };
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSumbitHandler = this.onSumbitHandler.bind(this);
        this.onEditSuccess = this.onEditSuccess.bind(this);
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
    }

    componentDidMount(){
        loadDetails(this.props.params.teamId, this.onLoadSuccess);
    }

    onLoadSuccess(response) {
        this.setState({
            name: response.name,
            description: response.description,
            inputDisabled: false
        });
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
        edit(this.props.params.teamId, this.state.name, this.state.description, this.onEditSuccess);
    }

    onEditSuccess(result) {
       this.context.router.push("/catalog");
    }

    render() {
        return (
            <div>
                <h1>Edit Team</h1>
                <EditForm
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

EditPage.contextTypes = {
    router: React.PropTypes.object
};