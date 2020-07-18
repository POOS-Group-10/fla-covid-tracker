import '../App.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import fetch from 'node-fetch';
import { json } from 'body-parser';

var count = 0

const News = () =>
{
	 const [countyNews, setCountyNews] = useState([]);
	 const [stateNews, setStateNews] = useState([]); // TODO only county for now reduce # of api call 
	 const [userName, setUserName] = useState('');
	 const [userCounty, setUserCounty] = useState("");

	 
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

	async function fetchData(){
		const response = await fetch("../api/profile", {
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
	}, []);  // the '[]' means run once only

	console.log('userCounty is :' + userCounty)
	async function makeRequest() {
		//https://gnews.io/api/v3/search?q=Florida&token=9716fdf90959ffffecdf3cc1237c63c7
		const url ='https://gnews.io/api/v3/search?q=Florida '+ userCounty +'&token=9716fdf90959ffffecdf3cc1237c63c7' 
		console.log('url: ' + url)
	
		const response = await fetch(url, {
			method:'GET',
			// headers:{'Content-Type': 'application/json'}
		})
		.then((res) => res.json())
		.then((json) => {
		
			
			var temp = ((json))
			console.log('temp: ' + temp)
			console.log('temp.articles: ' + temp.articles[0])
			console.log('temp.articles and some bitch: ' + temp[0].articles[0])
		// for (var x in json.articles){	
		// 	var j = json.articles[0]
		// 	listStorage.push(j)
		// }
			// setCountyNews(listStorage);
		})
		.catch(err => console.log(err))
	}
		count ++
		console.log(count)
		if ( count < 3 )
			makeRequest();

	return (
		<div>
			<div>
				<h1>{userName} News for {userCounty} County: </h1> 
				{/* {countyNews.map(res => <div>title: {res.articles[0].title}</div>)}
				{countyNews.map(res => <div>description: {res.articles[0].description}</div>)}
				{countyNews.map(res => <div>url: {res.articles[0].url}</div>)}

				{countyNews.map(res => <div>title: {res.articles[1].title}</div>)}
				{countyNews.map(res => <div>description: {res.articles[1].description}</div>)}
				{countyNews.map(res => <div>url: {res.articles[1].url}</div>)}

				{countyNews.map(res => <div>title: {res.articles[2].title}</div>)}
				{countyNews.map(res => <div>description: {res.articles[2].description}</div>)}
				{countyNews.map(res => <div>url: {res.articles[2].url}</div>)} */}
				
			</div>
		</div>
	)
};

export default News;

