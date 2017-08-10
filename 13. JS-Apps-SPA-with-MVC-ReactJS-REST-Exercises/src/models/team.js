import * as requester from './requester';

function create(name, description, callback) {
    let teamData = {
        name: name,
        description: description
    };

    requester.post("appdata", "teams", "kinvey", teamData)
        .then(() => callback(true))
        .catch(() => callback(false))
}

function loadTeams(callback) {
    requester.get("appdata", "teams", "kinvey")
        .then(callback)
}

function loadDetails(teamId, callback) {
    requester.get("appdata", "teams/" + teamId, "kinvey")
        .then(callback)
}

function edit(teamId, name, description, callback) {
    let teamData = {
        name: name,
        description: description
    };
    requester.update('appdata', 'teams/' + teamId, teamData, 'kinvey')
        .then(callback);
}


export {create, loadTeams, loadDetails, edit}