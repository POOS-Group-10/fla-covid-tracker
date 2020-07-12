import '../App.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import fetch from 'node-fetch';
import { json } from 'body-parser';
// const fetch = require("node-fetch");



const Covid = () =>
{
    const [county, setCountyInfo] = useState([]);
    const [userInfo, setUserInfo] = useState("")

    const url = 'https://covid19-us-api.herokuapp.com/county';

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

    var currentCounty = ";"
    var listStorage = []

    useEffect(() => {
        async function fetchData(){
            const response = await fetch(url, {
            method:'GET',
            headers:{'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(json => {
        setUserInfo(json)
        })
        .catch(err => console.log(err))
        }
        // console.log("County is " + userInfo.county)
        fetchData();
    }, []);

    async function makeRequest() {
        
        // for(var counties in floridaCounties)
        // {
            var js = {
                state: "FL",
                // county: "Alachua"
                // county: floridaCounties[counties]
                county: currentCounty
            }; 

            const response = await fetch(url, {
                method:'POST',
                body:JSON.stringify(js),
                headers:{'Content-Type': 'application/json'}
            })
            .then(res => res.json())
            .then(json => {
                var j = json.message[0]
                console.log("Line 104 " + j)
                listStorage.push(j)
                setCountyInfo(listStorage);
            })
            .catch(err => console.log(err))
        // }
    };
   
    return (
        <div>
            <h1>Covid Map</h1> 
            <button onClick={makeRequest}>Click Me</button>
    <h1>INfo is {userInfo.county}</h1>
            {county.map(res => <div>State: {res.state_name}</div>)}
            {county.map(res => <div>County: {res.county_name}</div>)}  
            {county.map(res => <div>Confirmed: {res.confirmed}</div>)} 
            {county.map(res => <div>Deaths: {res.death}</div>)}   
            {county.map(res => <div>New Death: {res.new_death}</div>)}   
            {county.map(res => <div>Last Updated: {res.last_update}</div>)}           

        </div>
    )
};

export default Covid;

