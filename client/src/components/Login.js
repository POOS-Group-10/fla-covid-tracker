// John Stoner
import '../App.css';
import React, {useState} from 'react';
import axios from 'axios';

function Login() 
{   
    // Not optimized. It's possible to create a single state variable
    // as an object that holds related code, but instead of merging to the object
    // when it updates, it will replace the object entirely, and I don't know which
    // one is more optimal yet.
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

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

        console.log('payload is ' + payload);
        axios({
            url: '../api', // React app is communicating with the server by this route
            method: 'POST', // GET is used by default
            data: payload
        })
        // These are promises
            .then((response) => {
              console.log('Data has been received');
              
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
                    type="text"
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

            <p>Don't have an account? Sign up.</p>
            </div>
        );

}

export default Login;