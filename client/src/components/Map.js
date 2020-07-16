import "../App.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Map = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);


  const makeMap = async (event) => {
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
    <div id="map"></div>
  );
};

export default Map;
