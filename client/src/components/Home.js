import React from 'react';
import { Link } from 'react-router-dom';

import '../App.css';

function Home() 
{

    return(
        <div>
            <h1>We logged in!</h1> 
            <Link to='Login'>Log out</Link>
        </div>
    );
}

export default Home;
