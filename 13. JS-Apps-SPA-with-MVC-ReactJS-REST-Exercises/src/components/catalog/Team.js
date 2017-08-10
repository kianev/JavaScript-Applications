import React, { Component } from 'react';
import './Team.css';
import {Link} from 'react-router';

export default class Team extends Component {
    render(){
        return (
            <div className="team-box">
                <span className="spanner">Name</span>
                <span>{this.props.name}</span>
                <span className="spanner">Description</span>
                <p>{this.props.description || "No Description"}</p>
                <span className="spanner">Management</span>
                <Link to={"/edit/" + this.props.teamId} className="btn btn-info">Edit</Link>
            </div>
        );
    }
}
