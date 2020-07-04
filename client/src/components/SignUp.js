import '../App.css';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => 
{   
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const doLogin = async event => 
    {    
        event.preventDefault(); // Stops the browser from refreshing
        
        const payload = {
            userName: userName,
            password: password,
            firstName: firstName,
            lastName: lastName,
            email: email
        };
        var payloadJson = JSON.stringify(payload)
        console.log('payload is ' + payloadJson);
        axios({
            url: '../api/SignUp', // React app is communicating with the server by this route
            method: 'POST', // GET is used by default
            data: payload
        })
        // These are promises
            .then((response) => {
              console.log('Data has been received');
              setMessage('Sign up successful. Please check your email and verify your account.');
            })
            .catch(() => {
              console.log('Internal server error');
            });
    };

        return(
            <div className="app">
            <form onSubmit={doLogin}>
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
                <button>Submit</button>
            </form>

            <Link to="/">Already have an account? Log in.</Link><br />
            <p>{message}</p>
            </div>
        );

}

export default SignUp;
