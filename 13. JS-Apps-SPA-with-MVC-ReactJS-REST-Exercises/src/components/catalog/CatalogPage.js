import React, {Component} from 'react';
import Team from './Team';
import {loadTeams} from '../../models/team';

export default class CatalogPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teams: []
        };
        this.onLoadSuccess = this.onLoadSuccess.bind(this);
    }

    componentDidMount(){
        loadTeams(this.onLoadSuccess);
    }

    onLoadSuccess(response) {
        this.setState({teams: response});
    }

    render() {
        return (
            <div>
                <h1>Catalog Page</h1>
                {this.state.teams.map((team, i) => {
                    return <Team key={i} name={team.name} description={team.description} teamId={team._id}/>
                })}
            </div>
        );
    }
}


