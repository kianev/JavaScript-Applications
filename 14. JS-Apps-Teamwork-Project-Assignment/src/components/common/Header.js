import React, {Component} from 'react';
import Greeting from './Greeting';

export default class Header extends Component{
    render(){
        return (
            <div className="jumbotron">
                <h1>Blog Project</h1>
                <Greeting loggedIn={this.props.loggedIn} username={this.props.username}/>
                {this.props.children}
            </div>
        )
    }
}
