import React from 'react';
import { Link } from 'react-router-dom';

import '../App.css';

const Home = () =>
{

    return(
        <div>
            <h1>We logged in!</h1> 
            <Link to='/'>Log out</Link>
        </div>
    );
}

export default Home;
