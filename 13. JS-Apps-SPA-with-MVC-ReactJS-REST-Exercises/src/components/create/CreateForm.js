import React, {Component} from 'react';

export default class CreateForm extends Component {

    render() {
        return (
            <form onSubmit={this.props.onSubmit}>
                <div className="form-group">
                    <label>
                        Name:
                    </label>
                    <input className="form-control" type="text" name="name" value={this.props.name}
                           onChange={this.props.onChange}/>
                    </div>
                <div className="form-group">
                    <label>
                        Description:
                    </label>
                    <textarea className="form-control" type="text" name="description" value={this.props.description}
                           onChange={this.props.onChange}/>
                </div>
                <input type="submit" value="CreateTeam" className="btn btn-primary" disabled={this.props.inputDisabled}/>
            </form>
        );
    }
}