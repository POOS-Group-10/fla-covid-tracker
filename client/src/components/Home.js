import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fetch from 'node-fetch';
import axios from "axios";


import '../App.css';

const Home = () =>
{
<<<<<<< HEAD
    const url = 'http://localhost:3000/api/profile';
    // const url = 'https://florida-covid-tracking.herokuapp.com/api/profile';
    const [userInfo, setUserInfo] = useState({})
=======
    // const url = 'http://localhost:3000/api/profile';
    const url = 'https://florida-covid-tracking.herokuapp.com/api/profile';
    const [userName, setUserName] = useState('');
>>>>>>> master
    var list = []
  
    useEffect(() => {
            async function fetchData(){
                const response = await fetch(url, {
                method:'POST',
                headers:{'Content-Type': 'application/json'}
            })

            
            // axios({
            //     url: "../../api/profile", // React app is communicating with the server by this route
            //     method: "GET" // GET is used by default
            //   })
            .then((res) => res.json())
            .then((json) => {
                console.log("json in home.js json.county: " + json + " "  + json.county)
                setUserName(json.userName)

            })
            .catch(err => 
            {
                console.log("catch block of api/profile")
                console.log(err)
            })
            }
            
            fetchData();
        }, []);

    return(
        <div >
            <h1 >Welcome {userName}</h1> 
            <Link to='/'>Log out john_branch</Link>
        </div>
    );
}

export default Home;
