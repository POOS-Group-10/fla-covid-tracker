import "../App.css";
import React, { useState } from "react";
import axios from "axios";

const PasswordRecovery = () => {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendRecoveryEmail = async (event) => 
  {
    event.preventDefault(); // Stops the browser from refreshing

    const payload = {
      email: email,
    };
    
    axios({
      url: "../api/PasswordRecovery", // React app is communicating with the server by this route
      method: "POST", // GET is used by default
      data: payload,
    })
      // These are promises
      .then((response) => {
        console.log(response);
        setMessage("An email has been sent to " + email);
      })
      .catch((e) => {
        console.log("Internal server error " + e);
      });
  };

  return (
    <div className="app">
      <h3>Reset your password:</h3>
      <form onSubmit={sendRecoveryEmail}>
        <div className="form-input">
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button id="isLeft">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default PasswordRecovery;
