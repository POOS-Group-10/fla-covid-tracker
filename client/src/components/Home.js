import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fetch from 'node-fetch';
import axios from "axios";


import '../App.css';

const Home = () =>
{
    // const url = 'http://localhost:3000/api/profile';
    const url = 'https://florida-covid-tracking.herokuapp.com/api/profile';
    const [userInfo, setUserInfo] = useState({})
    var list = []
  
    useEffect(() => {
            async function fetchData(){
                const response = await fetch("../api/profile", {
                method:'GET',
                headers:{'Content-Type': 'application/json'}
            })
            // axios({
            //     url: "../api/profile", // React app is communicating with the server by this route
            //     method: "GET" // GET is used by default
            //   })
            // .then(res => {
            //     // console.log("Home.js api/profile was called correctly" + typeof(res) + " " + typeof(res.json()))
            //     res.json()
            // })
            .then(json => {
                // console.log("json in home.js json.county: " + json +" "  + json.county)
                console.log("Home.js text " + console.log(json.text()))  
                console.log("Home.js " + JSON.stringify(json))
                setUserInfo(json)

            })
            .catch(err => 
            {
                console.log("catch block of api/profile")
                console.log(err)
            })
            }
            
            // fetchData();
        }, []);

    return(
        <div >
            <h1 >Welcome {userInfo.userName}</h1> 
            <Link to='/'>Log out</Link>
        </div>
    );
}

export default Home;
