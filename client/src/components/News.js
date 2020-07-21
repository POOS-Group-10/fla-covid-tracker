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
		const url ='https://gnews.io/api/v3/search?q=Florida covid '+ userCounty +'&token=9716fdf90959ffffecdf3cc1237c63c7'//jack@knights..
		const url2 = 'https://gnews.io/api/v3/search?q=Florida covid '+ userCounty +'&token=711ee2ac90c6730fa58a7af453ef7d31'//jack@gmail..
		//john has url3 key
		const url4 ='https://gnews.io/api/v3/search?q=Florida covid '+ userCounty +'&token=affa7f570a57ef6a60a097b9d62b4811'//jack@live
		
		console.log('url: ' + url)
	
		const response = await fetch(url4, {
			method:'GET',
			// headers:{'Content-Type': 'application/json'}
		})
		.then((res) => res.json())
		.then((json) => {
	
			var j = json.articles
			listStorage.push(j)

			setCountyNews(listStorage);
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
				<h1>News for {userCounty} County: </h1> 
				{countyNews.map(res => <div>{res[0].title}</div>)}
				{countyNews.map(res => <div>{res[0].description}</div>)}
				{countyNews.map(res => <div><a href={res[0].url}>{res[0].url}</a></div>)}
				{countyNews.map(res => <div>{res[0].publishedAt}</div>)}
				<br></br>
				{countyNews.map(res => <div>{res[1].title}</div>)}
				{countyNews.map(res => <div>{res[1].description}</div>)}
				{countyNews.map(res => <div><a href={res[1].url}>{res[1].url}</a></div>)}
				{countyNews.map(res => <div>{res[1].publishedAt}</div>)}
				<br></br>
				{countyNews.map(res => <div>{res[2].title}</div>)}
				{countyNews.map(res => <div>{res[2].description}</div>)}
				{countyNews.map(res => <div><a href={res[2].url}>{res[2].url}</a></div>)}
				{countyNews.map(res => <div>{res[2].publishedAt}</div>)}
			</div>
			<h6>If news doesn't load, please refresh page.</h6>
		</div>
	)
};

export default News;
// module.exports = makeRequest;