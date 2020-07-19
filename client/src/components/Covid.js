import '../App.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import fetch from 'node-fetch';
import { json } from 'body-parser';

var count = 0

const Covid = () =>
{
    const [countyInfo, setCountyInfo] = useState([]);
    const [userName, setUserName] = useState('');
    const [userCounty, setUserCounty] = useState("");

    const url = 'https://covid19-us-api.herokuapp.com/county';
    // const url2 ='http://localhost:3000/api/profile';
    const url2 ='https://florida-covid-tracking.herokuapp.com/api/profile';
    
    var listStorage = []

    async function fetchData(){
        const response = await fetch(url2, {
        method:'POST',
        headers:{'Content-Type': 'application/json'}
    })

    .then((res) => res.json())
    .then((json) => {
        setUserCounty(json.county);
        setUserName(json.userName);
    })
    .catch(err => console.log(err))
    }

    useEffect(() => {
		fetchData();
	}, []);
	
	const makeRequest = async (event) =>{

            var js = {
                state: "FL",
                county: userCounty
            }; 
            
            console.log("JS is " + JSON.stringify(js))
            const response = await fetch(url, {
                method:'POST',
                body:JSON.stringify(js),
                headers:{'Content-Type': 'application/json'}
            })
            .then((res) => res.json())
            .then((json) => {
                var j = json.message[0]
                listStorage.push(j)
                console.log("list " + listStorage)
                setCountyInfo(listStorage);
            })
            .catch(err => console.log(err))

    };

	count ++
	console.log(count)
	if ( count < 10 )
		makeRequest();


    return (
        <div>
            <div>
                <h1>Covid Map</h1> 
                <h1>User County is {userCounty}</h1>
                {countyInfo.map(res => <div>State: {res.state_name}</div>)}
                {countyInfo.map(res => <div>County: {res.county_name}</div>)}  
                {countyInfo.map(res => <div>Confirmed: {res.confirmed}</div>)} 
                {countyInfo.map(res => <div>Deaths: {res.death}</div>)}   
                {countyInfo.map(res => <div>New Death: {res.new_death}</div>)}   
                {countyInfo.map(res => <div>Last Updated: {res.last_update}</div>)}           
            </div>
        </div>
    )
};

export default Covid;

