import "../App.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);


  const doLogin = async (event) => {
    event.preventDefault(); // Stops the browser from refreshing

    const payload = {
      userName: userName,
      password: password,
    };
    axios({
      url: '../api/Login', // React app is communicating with the server by this route
      method: "POST", // GET is used by default
      data: payload,
    })
      .then((response) => {
        console.log('response to login api: ' + response)
        if (response.data.auth == "0"){
          setLoggedIn(false);
        } else{
          console.log('loggin to accepted')
          setLoggedIn(true)}
              
      })
      .catch((e) => {
        console.log("Internal server error " + e);
      });
  };

  if (isLoggedIn) {
    return <Redirect to='/Home' />;
  }

  return (
    <div className="app">
      {/* <audio autoplay>
        <source src="../music.mp3" type="audio/mpeg">
        </source>
        </audio> */}
  <form onSubmit={doLogin}>
        <div className="form-input">
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="form-input">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button id="isLeft">Submit</button>
      </form>

      <Link to="/SignUp">Don't have an account? Sign up.</Link><br />
      <Link to="/PasswordRecovery">Forgot your password?</Link><br />
    </div>
  );
};

export default Login;
