import React, { Component } from 'react';

export default class Greeting extends Component {
    render(){
        if (!this.props.username) return null;
        return (
           <div>Welcome, {this.props.username}!</div>
        )
    }
}
