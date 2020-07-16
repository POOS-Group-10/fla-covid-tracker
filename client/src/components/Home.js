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
        console.log("json in home.js json.county: " + json[0] + " "  + json.county)

        // Prevent from going to home without a session
        const json2 = json
        if ( JSON.stringify(json2) == '{}' ) {
            console.log('setting to false bitch') 
            setLoggedIn(false)
        }        
        
            setUserName(json.userName)

    })
    .catch(err => 
    {
        console.log("catch block of api/profile")
        console.log(err)
    })
    }

    useEffect(() => {
            fetchData();
        }, []);

    if (!isLoggedIn) {
        return <Redirect to='/Login' />
        }

    return(
        <div >
            <h1 >Welcome {userName}</h1> 
            <Link to='/'>Log out</Link>
        </div>
    );
}

export default Home;
