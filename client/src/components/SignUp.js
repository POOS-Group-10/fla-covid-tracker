import '../App.css';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { set } from 'mongoose';


const SignUp = () => 
{   
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [userCounty, setCounty] = useState('Alachua');
    const [isRegistered, setRegistered] = useState(false);

    const doSignUp = async event => 
    {    
        console.log("Ented the doSignUp Function");
        event.preventDefault(); // Stops the browser from refreshing
        
        const payload = {
            userName: userName,
            password: password,
            firstName: firstName,
            lastName: lastName,
            userCounty: userCounty,
            email: email,
            verified: false
        };
        
        console.log("About to enter axios, payload is: " + payload.userName);
        axios({
            url: '../api/findUser',
            method: 'POST',
            data: {userName: payload.userName}
        })
        .then((response) => {
            if (response.data.taken === "1") {
                setMessage(response.data.msg);
                return;
            }
            else {
                console.log("Name not taken. yay! " + payload.verified);
                axios({
                    url: '../api/SignUp', // React app is communicating with the server by this route
                    method: 'POST', // GET is used by default
                    data: payload
                })
                // These are promises
                .then((response) => {
                        // setRegistered(true)
                console.log("data is: " + typeof(response))
                setMessage(response.data.msg);
                })
                .catch((e) => {
                   console.log('Internal server error: ' + e);
                });
            }
        })
        .catch((error) => {
            console.log("did not like ajax responsef")
            console.log(error);
        });
    
    };

        return(
            <div className="app">
            <form onSubmit={doSignUp}>
                <div className = "form-input">
                    <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={e => setUserName(e.target.value)}
                    />
                </div>
                <div className = "form-input">
                    <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className = "form-input">
                    <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={e => setFirstName(e.target.value)}
                    />
                </div>
                <div className = "form-input">
                    <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={e => setLastName(e.target.value)}
                    />
                </div>
                <div className = "form-input">
                    <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className = "form-input">
                    <select onChange={e => setCounty(e.target.value)}>
                        <option value="Alachua" > Alachua  </option>
                        <option value="Baker" > Baker  </option>
                        <option value="Bay" > Bay  </option>
                        <option value="Bradford" > Bradford  </option>
                        <option value="Brevard" > Brevard  </option>
                        <option value="Broward" > Broward  </option>
                        <option value="Calhoun" > Calhoun  </option>
                        <option value="Charlotte" > Charlotte  </option>
                        <option value="Citrus" > Citrus  </option>
                        <option value="Clay" > Clay  </option>
                        <option value="Collier" > Collier  </option>
                        <option value="Columbia" > Columbia  </option>
                        <option value="Dixie" > Dixie  </option>
                        <option value="Duval" > Duval  </option>
                        <option value="Escambia" > Escambia  </option>
                        <option value="Flagler" > Flagler  </option>
                        <option value="Franklin" > Franklin  </option>
                        <option value="Gadsden" > Gadsden  </option>
                        <option value="Gilchrist" > Gilchrist  </option>
                        <option value="Glades" > Glades  </option>
                        <option value="Gulf" > Gulf  </option>
                        <option value="Hamilton" > Hamilton  </option>
                        <option value="Hardee" > Hardee  </option>
                        <option value="Hendry" > Hendry  </option>
                        <option value="Hernando" > Hernando  </option>
                        <option value="Highlands" > Highlands  </option>
                        <option value="Hillsborough" > Hillsborough  </option>
                        <option value="Holmes" > Holmes  </option>
                        <option value="Indian River" > Indian River  </option>
                        <option value="Jackson" > Jackson  </option>
                        <option value="Jefferson" > Jefferson  </option>
                        <option value="Lafayette" > Lafayette  </option>
                        <option value="Lake" > Lake  </option>
                        <option value="Lee" > Lee  </option>
                        <option value="Leon" > Leon  </option>
                        <option value="Levy" > Levy  </option>
                        <option value="Liberty" > Liberty  </option>
                        <option value="Madison" > Madison  </option>
                        <option value="Manatee" > Manatee  </option>
                        <option value="Marion" > Marion  </option>
                        <option value="Martin" > Martin  </option>
                        <option value="Miami-Dade" > Miami-Dade  </option>
                        <option value="Monroe" > Monroe  </option>
                        <option value="Nassau" > Nassau  </option>
                        <option value="Okaloosa" > Okaloosa  </option>
                        <option value="Okeechobee" > Okeechobee  </option>
                        <option value="Orange" > Orange  </option>
                        <option value="Osceola" > Osceola  </option>
                        <option value="Palm Beach" > Palm Beach  </option>
                        <option value="Pasco" > Pasco  </option>
                        <option value="Pinellas" > Pinellas  </option>
                        <option value="Polk" > Polk  </option>
                        <option value="Putnam" > Putnam  </option>
                        <option value="Santa Rosa" > Santa Rosa  </option>
                        <option value="Sarasota" > Sarasota  </option>
                        <option value="Seminole" > Seminole  </option>
                        <option value="St. Johns" > St. Johns  </option>
                        <option value="St. Lucie" > St. Lucie  </option>
                        <option value="Sumter" > Sumter  </option>
                        <option value="Suwannee" > Suwannee  </option>
                        <option value="Taylor" > Taylor  </option>
                        <option value="Union" > Union  </option>
                        <option value="Volusia" > Volusia  </option>
                        <option value="Wakulla" > Wakulla  </option>
                        <option value="Walton" > Walton  </option>
                        <option value="Washington"> Washington </option>
                    </select> 
                </div>
                <button>Submit</button>
            </form>
                <Link to="/">Already have an account? Log in.</Link><br />
                <p>{message}</p>
            </div>
        );
}

export default SignUp;

           
