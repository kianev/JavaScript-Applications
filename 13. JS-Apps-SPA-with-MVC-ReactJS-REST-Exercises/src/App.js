import React, {Component} from 'react';
import Header from './components/common/Header';
import {Link} from 'react-router';
import observer from './models/observer';
import {logout} from './models/user';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            username: ''
        };
        this.onSessionUpdate = this.onSessionUpdate.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    componentDidMount() {
        observer.onSessionUpdate = this.onSessionUpdate;
        this.onSessionUpdate();
    }

    onSessionUpdate() {
        let name = sessionStorage.getItem("username");
        if (name) {
            this.setState({loggedIn: true, username: sessionStorage.getItem("username")});
        } else {
            this.setState({loggedIn: false, username: ''});
        }
    }

    onLogout(){
        this.onSessionUpdate();
    }


    render() {
        if (this.state.loggedIn) {
            return (
                <div className="container">
                    <Header loggedin={this.state.loggedIn} username={this.state.username}>
                        <Link to="/" className="btn btn-info">Home</Link>
                        <Link to="/create" className="btn btn-info">Create Team</Link>
                        <Link to="/catalog" className="btn btn-info">Catalog</Link>
                        <Link to="/about" className="btn btn-info">About</Link>
                        <Link to="" className="btn btn-info" onClick={() => logout(this.onLogout)}>Logout</Link>
                    </Header>
                    {this.props.children}
                </div>
            );
        }
        return (
            <div className="container">
                <Header loggedin={this.state.loggedIn} username={this.state.username}>
                    <Link to="/" className="btn btn-info">Home</Link>
                    <Link to="/about" className="btn btn-info">About</Link>
                    <Link to="/login" className="btn btn-info">Login</Link>
                    <Link to="/register" className="btn btn-info">Register</Link>
                </Header>
                {this.props.children}
            </div>
        );
    }
}

