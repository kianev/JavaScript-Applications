import React, {Component} from 'react';

export default class CreateForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.onSubmit}>
                <div className="form-group">
                    <label>
                        Title:
                    </label>
                    <input className="form-control" type="text"
                           name="title" value={this.props.title}
                           onChange={this.props.onChange}/>
                </div>
                <div className="form-group">
                    <label>
                        Content:
                    </label>
                    <textarea className="form-control" type="text"
                           name="content" value={this.props.content}
                           onChange={this.props.onChange}/>
                </div>
                <input type="submit" value="Create" className="btn btn-primary" disabled={this.props.inputDisabled}/>
            </form>
        )
    }
}

