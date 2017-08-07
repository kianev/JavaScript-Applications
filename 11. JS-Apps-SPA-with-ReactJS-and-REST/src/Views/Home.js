import React from 'react';

export default function Home(props){
    return <div className="homeView">
        <h1>Welcome to Home</h1>
        <p>Welcome to my Book Library</p>
        {
            props.username ?
                <p>Welcome, {props.username}!</p>
                :
                <p>No user logged in.</p>
        }
    </div>
}
