import '../App.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import fetch from 'node-fetch';
import { json } from 'body-parser';

// const fetch = require("node-fetch");

const Covid = () =>
{
    const [countyInfo, setCountyInfo] = useState([]);
    const [userInfo, setUserInfo] = useState([{userName: "", county: ""}]);
    const [userCounty, setUserCounty] = useState("");

    const url = 'https://covid19-us-api.herokuapp.com/county';
    // const url2 ='http://localhost:3000/api/profile';
    const url2 ='https://florida-covid-tracking.herokuapp.com/api/profile';
    
    var currentCounty = "";
    var floridaCounties = 
    ["Alachua",
    "Baker",
    "Bay",
    "Bradford",
    "Brevard",
    "Broward",
    "Calhoun",
    "Charlotte",
    "Citrus",
    "Clay",
    "Collier",
    "Columbia",
    "Dixie",
    "Duval",
    "Escambia",
    "Flagler",
    "Franklin",
    "Gadsden",
    "Gilchrist",
    "Glades",
    "Gulf",
    "Hamilton",
    "Hardee",
    "Hendry",
    "Hernando",
    "Highlands",
    "Hillsborough",
    "Holmes",
    "Indian River",
    "Jackson",
    "Jefferson",
    "Lafayette",
    "Lake",
    "Lee",
    "Leon",
    "Levy",
    "Liberty",
    "Madison",
    "Manatee",
    "Marion",
    "Martin",
    "Miami-Dade",
    "Monroe",
    "Nassau",
    "Okaloosa",
    "Okeechobee",
    "Orange",
    "Osceola",
    "Palm Beach",
    "Pasco",
    "Pinellas",
    "Polk",
    "Putnam",
    "Santa Rosa",
    "Sarasota",
    "Seminole",
    "St. Johns",
    "St. Lucie",
    "Sumter",
    "Suwannee",
    "Taylor",
    "Union",
    "Volusia",
    "Wakulla",
    "Walton",
    "Washington"]
    var listStorage = []

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
        .then(res => res.json())
        .then(json => {
            // const json_conv =  "'" + json + "'" 
            // const data = JSON.parse(json);
            console.log("In Covid.js: " + json + " json.county is " + json.county)
            // setUserCounty(json.county);
            setUserCounty(json.county);
            setUserInfo({userName: json.userName, county: json.county})
        })
        .catch(err => console.log(err))
        }
        fetchData();
    }, []);
//    currentCounty = userInfo.userName
    async function makeRequest() {
        // console.log("User county in covid.js bitch:" + userInfo.userCounty)
        // for(var counties in floridaCounties)
        // {
            var js = {
                state: "FL",
                county: userCounty
                // county: "Alachua"
            }; 
            
            console.log("JS is " + JSON.stringify(js))
            const response = await fetch(url, {
                method:'POST',
                body:JSON.stringify(js),
                headers:{'Content-Type': 'application/json'}
            })
            // axios({
            //     url: url, // React app is communicating with the server by this route
            //     method: "POST",
            //     data: js // GET is used by default
            //   })
            .then(res => res.json())
            .then(json => {
                console.log("json in Covid.js is type of: " + typeof(json) + " response is " + json.message[0] + " ---- " + JSON.stringify(json.message[0]))
                var j = json.message[0]
                listStorage.push(j)
                console.log("list " + listStorage)
                setCountyInfo(listStorage);
            })
            .catch(err => console.log(err))
        // }
    };
   
    return (
        <div>
            <h1>Covid Map</h1> 
            <button onClick={makeRequest}>Click Me</button>
            <h1>User County is {userInfo.county}</h1>
            {countyInfo.map(res => <div>State: {res.state_name}</div>)}
            {countyInfo.map(res => <div>County: {res.county_name}</div>)}  
            {countyInfo.map(res => <div>Confirmed: {res.confirmed}</div>)} 
            {countyInfo.map(res => <div>Deaths: {res.death}</div>)}   
            {countyInfo.map(res => <div>New Death: {res.new_death}</div>)}   
            {countyInfo.map(res => <div>Last Updated: {res.last_update}</div>)}           

        </div>
    )
};

export default Covid;

