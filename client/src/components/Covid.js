import '../App.css';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import fetch from 'node-fetch';
// const fetch = require("node-fetch");



const Covid = () =>
{
    const [county, setCountyInfo] = useState([]);

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

    var listStorage = []

    async function makeRequest() {
        
        // for(var counties in floridaCounties)
        // {
            var js = {
                state: "FL",
                county: "Alachua"
                // county: floridaCounties[counties]
            }; 

            const response = await fetch(url, {
                method:'POST',
                body:JSON.stringify(js),
                headers:{'Content-Type': 'application/json'}
            })
            .then(res => res.json())
            .then(json => {
                var confirmed = json.message[0]
                listStorage.push(confirmed)
                setCountyInfo(listStorage);
            })
            .catch(err => console.log(err))
        // }
    };
   
    return (
        <div>
            <h1>Covid Map</h1> 
            <button onClick={makeRequest}>Click Me</button>
            {county.map(res => <div>{res.state_name}</div>)}
            {county.map(res => <div>{res.confirmed}</div>)}             

        </div>
    )
};

export default Covid;

