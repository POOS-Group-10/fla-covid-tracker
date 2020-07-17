import React, { useState } from "react";
// import axios from "axios";
import "../App.css";

const PasswordReset = () =>
{
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const resetPassword = async event =>
    {
        

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
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-input">
              <input
                type="password"
                placeholder="Confirm Password"
                name="email"
                onChange={(e) => {setConfirmPassword(e.target.value)}}
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