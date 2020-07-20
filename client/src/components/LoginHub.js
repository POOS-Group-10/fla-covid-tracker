import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
//USERNAME GOES HERE 
const LoginHub = () =>
{
    return(
        <div>
            <div class="right">
            <p styles="white-space: nowrap">Welcome,</p>
            </div>
            <p class="downleft">
            <Link to='/Blog'>Blog</Link>
            </p>
            <Link to='/Home'>HomePage</Link>
            <p class="upright">
            <Link to='/'>Log out</Link>
            </p>
            <script>
            </script>
        </div>
    );
}

export default LoginHub;