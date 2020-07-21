import React, { useState, useEffect } from "react";
import axios from "axios";

import "../App.css";

const PasswordReset = () =>
{
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const resetPassword = async event =>
    {
      console.log('entered resetpassword')
      if (!matching)
      {
        console.log('passwords dont match')
        return;
      }
      
      const URL = window.location.pathname;
      const resetURL = 'PasswordReset/';

      const payload = {
        password: password
      }

      axios({
        url: '../api/PasswordReset/' + window.location.pathname.slice(URL.indexOf(resetURL) + resetURL.length),
        method: 'PUT',
        data: payload
      })
      .then(() => {
        console.log('password reset success')
      })
      .catch((error) => {
        console.log('password reset error: ' + error)
      });

    }

    useEffect(() => {
      checkMatching();
    })

    const matching = password === confirmPassword;

    const checkMatching = async event =>
    {
      if (password === confirmPassword)
        setMessage('Passwords match.')
      else 
        setMessage('Passwords do not match')
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
            <button id="isLeft">Submit</button>
          </form>
          <p>{message}</p><br />
          <p>{password}</p><br />
          <p>{confirmPassword}</p>

        </div>
      );
};

export default PasswordReset;