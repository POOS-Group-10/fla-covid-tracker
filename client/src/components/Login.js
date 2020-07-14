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
    
    // const response = await fetch("../api/Login", {
    //   method:'POST',
    //   body:JSON.stringify(payload),
    //   headers:{'Content-Type': 'application/json'}
    // })
    axios({
      url: "../api/Login", // React app is communicating with the server by this route
      method: "POST", // GET is used by default
      data: payload,
    })
      .then((response) => {
        console.log('response of api Login: ' + response);
        console.dir('response of api (.dir)Login:' + response)
        const test = response
        console.dir('test.dir: ' + test)
        console.log('test.log: ' + test)
        console.log('.tosource: ' + test.toSource())
        setLoggedIn(true);
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
        <button>Submit</button>
      </form>

      <Link to="/SignUp">Don't have an account? Sign up.</Link><br />
      <Link to="/Home">Go to the dashboard</Link><br />
      <Link to="/PasswordRecovery">Forgot your password?</Link><br />
      <Link to="/PasswordReset">Go to the Password Reset page</Link>
    </div>
  );
};

export default Login;
