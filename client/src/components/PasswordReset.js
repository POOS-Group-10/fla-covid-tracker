import React, { useState } from "react";
import axios from "axios";

import "../App.css";

const PasswordReset = () =>
{
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const resetPassword = async event =>
    {
        event.preventDefault();

        if (password !== confirmPassword) {
          setMessage("Passwords do not match!");
        }
        else {
          const payload = {
            userName: 'Plotinus',
            password: password
          };

          axios({
            url: "../api/PasswordReset", // React app is communicating with the server by this route
            method: "POST", // GET is used by default
            data: payload,
          })
            // These are promises
            .then((response) => {
              setMessage(response.data.msg);
            })
            .catch((e) => {
              console.log("Internal server error " + e);
            });
        }

    }

    return (
        <div className="app">
          <h3>Reset your password:</h3>
          <form onSubmit={resetPassword}>
            <div className="form-input">
              <input
                type="password"
                placeholder="Password"
                name="email"
                onChange={(e) => {setPassword(e.target.value, 1)}}
              />
            </div>
            <div className="form-input">
              <input
                type="password"
                placeholder="Confirm Password"
                name="email"
                onChange={(e) => {setConfirmPassword(e.target.value, 0)}}
              />
            </div>
            <button>Submit</button>
          </form>
          <p>{message}</p><br />
          <p>{password}</p><br />
          <p>{confirmPassword}</p>

        </div>
      );
};

export default PasswordReset;