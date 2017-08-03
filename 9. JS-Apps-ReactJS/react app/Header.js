import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className="header">
                <a href="">Home </a>
                <a href="">Login </a>
                <a href="">Logout </a>
            </div>
        );
    }
}

export default Header;
