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

    const doLogin = async event => 
    {    
        event.preventDefault(); // Stops the browser from refreshing
        
        
        const payload = {
            userName: userName,
            password: password,
        };
        console.log('payload is ' + payload.userName + ' ' + payload.password);
        axios({
            url: '../api/Login', // React app is communicating with the server by this route
            method: 'POST', // GET is used by default
            data: payload
        })
            // These are promises
            .then((response) => {
              console.log('Data has been received ' + response.data);
              if (response)
                window.location.href='/Home';
              else {

              }
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
                <button>Submit</button>
            </form>

            {/* <a href="/SignUp">Don't have an account? Sign up.</a> */}
            </div>
        );

}

export default Login;