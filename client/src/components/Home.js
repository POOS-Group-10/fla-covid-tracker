import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fetch from 'node-fetch';
import axios from "axios";
import { Redirect } from "react-router-dom";


import '../App.css';

const Home = () =>
{
    // const url = 'http://localhost:3000/api/profile'; 

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

const toBlog = () => { 
        window.location.href = '/Blog'
 }
 const toLogOut = () => {
    window.location.href = '/'
  }


    if (!isLoggedIn) {
        return <Redirect to='/Login' />
        }
// THIS GOES UNDER LOG OUT LINK:
/*  
  <Link to='/CreatePost'>Create a post</Link>
*/
    return(
        <div >
            <h1 >Welcome {userName}</h1>
            <button onClick={toBlog}>
           Blog
            </button>
            <button onClick={toLogOut}>
            Log Out
            </button>
        </div>
    );
}

export default Home;
