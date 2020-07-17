import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const NotLoggedIn = () =>
{
    return(
        <div>
            <div class="right">
            <Link to='/' styles="white-space: nowrap">Log In</Link><div />
            <Link to='/Home'>HomePage</Link>
            <p class="upright">
            <Link to='/SignUp'>Sign Up</Link>
            </p>
            </div>
            <script>
            </script>
        </div>
    );
}

export default NotLoggedIn;