import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fetch from 'node-fetch';
import { Redirect } from "react-router-dom";
const LoginHub = () =>
{       // const url = 'http://localhost:3000/api/profile'; 
    
        const url = 'https://florida-covid-tracking.herokuapp.com/api/profile';
        const [userName, setUserName] = useState('');
        const [isLoggedIn, setLoggedIn] = useState(true);
        var list = []
      
        async function fetchData(){
            const response = await fetch(url, {
            method:'POST',
            headers:{'Content-Type': 'application/json'}
        })
        .then((res) => res.json())
        .then((json) => {
            // Prevent from going to home without a session
            const json2 = json
            if ( JSON.stringify(json2) == '{}' ) {
                setLoggedIn(false)
            }        
                setUserName(json.userName)
        })
        .catch(err => 
        {
            console.log(err)
        })
    }
    
        fetchData(); 
    
        if (!isLoggedIn) {
            return <Redirect to='/Login' />
            }
    return(
        <div>
            <div class="right">
            <p styles="white-space: nowrap">Welcome {userName}</p>
            </div>
            <p>
            <Link to='/Home'>HomePage</Link>
            </p>
            <p class="upright">
            <Link to='/'>Log out</Link>
            </p>
            <p class="downleft">
            <Link to='/Blog'>Blog</Link>
            </p>
            <script>
            </script>
        </div>
    );
};

export default LoginHub;