import React, { Component } from 'react';

export default class Header extends Component {
    render(){
        return (
            <div className="jumbotron">
                <h1>Team Manager</h1>
                {this.props.children}
            </div>
        );
    }
}


