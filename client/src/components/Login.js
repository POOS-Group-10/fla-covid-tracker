import "../App.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const doLogin = async (event) => {
    event.preventDefault(); // Stops the browser from refreshing

    const payload = {
      userName: userName,
      password: password,
    };
    console.log("payload is " + payload.userName + " " + payload.password);
    axios({
      url: "../api/Login", // React app is communicating with the server by this route
      method: "POST", // GET is used by default
      data: payload,
    })
      // These are promises
      .then((response) => {
        <Link to="/Home"></Link>
      })
      .catch((e) => {
        console.log("Internal server error " + e);
      });
  };

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

      <Link to="/SignUp">Don't have an account? Sign up.</Link>

    </div>
  );
};

export default Login;
