import React from 'react';
import { Link } from 'react-router-dom';

function AppName() {
    return (
        <Link to="/">
            <div>
            <Link to="/"> <h2 id='b-home'>Home</h2> </Link>
                <h1 id="name-title">MyMovies&Shows</h1>
            </div>

        </Link>
    );
}

export default AppName;
