import React, {Component} from 'react';

export default class RegisterForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.onSubmit}>
                <div className="form-group">
                    <label>
                        Username:
                    </label>
                    <input className="form-control" type="text"
                           name="username" value={this.props.username}
                           onChange={this.props.onChange}/>
                </div>
                <div className="form-group">
                    <label>
                        Password:
                    </label>
                    <input className="form-control" type="password"
                           name="password" value={this.props.password}
                           onChange={this.props.onChange}/>
                </div>
                <div className="form-group">
                    <label>
                        Repeat Password:
                    </label>
                    <input className="form-control" type="password"
                           name="repeat" value={this.props.repeat}
                           onChange={this.props.onChange}/>
                </div>
                <div className="form-group">
                    <label>
                        Name:
                    </label>
                    <input className="form-control" type="text"
                           name="fullName" value={this.props.fullName}
                           onChange={this.props.onChange}/>
                </div>
                <div className="form-group">
                    <label>
                        E-mail:
                    </label>
                    <input className="form-control" type="email"
                           name="email" value={this.props.email}
                           onChange={this.props.onChange}/>
                </div>
                <div className="form-group">
                    <label>
                        Phone:
                    </label>
                    <input className="form-control" type="text"
                           name="phone" value={this.props.phone}
                           onChange={this.props.onChange}/>
                </div>
                <input type="submit" value="Register" className="btn btn-primary" disabled={this.props.inputDisabled}/>
            </form>
        )
    }
}

