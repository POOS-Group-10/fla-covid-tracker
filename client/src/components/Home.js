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
        const response = await fetch("../api/profile", {
        method:'POST',
        headers:{'Content-Type': 'application/json'}
    })

    
    // axios({
    //     url: "../../api/profile", // React app is communicating with the server by this route
    //     method: "GET" // GET is used by default
    //   })
    .then((res) => res.json())
    .then((json) => {
        console.log("json in home.js json.county: " + json[0] + " "  + json.county)
        console.log('isLoggedIn: top ' + isLoggedIn)
        // if (json.userName == '') {
        //     console.log('setting to false bitch')
        //     setLoggedIn(false)}
        // if (json.userName != '') {
        //     console.log('setting to true bitch')
        //     setLoggedIn(true)  
        // }
        
        if ( jQuery.isEmptyObject(json) ) {
            console.log('setting to false bitch') 
            setLoggedIn(false)}
        if ( !jQuery.isEmptyObject(json) ) {
            console.log('setting to true bitch')
            setLoggedIn(true)  
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

    console.log('isLoggedIn: bottom ' + isLoggedIn)
    if (!isLoggedIn) {
        return <Redirect to='/Login' />
        }

    return(
        <div >
            <h1 >Welcome {userName}</h1> 
            <Link to='/'>Log out jack_branch</Link>
        </div>
    );
}

export default Home;
