import React from 'react';
import axios from 'axios';

import '../App.css';

const EmailVerification = () =>
{
    const URL = window.location.pathname;
    const emailURL = 'EmailVerification/';

    const doEmailVerification = async (event) =>
    {
        console.log('the current page is ' + window.location.pathname);
        console.log('the sliced page is ' + window.location.pathname.slice(URL.indexOf(emailURL) + emailURL.length));
        axios({
            url: '../api/EmailVerification/' + window.location.pathname.slice(URL.indexOf(emailURL) + emailURL.length),
            method: 'PUT'
        })
        .then(() => {
            console.log('email verification success')
        })
        .catch((error) => {
            console.log('email verification error: ' + error)
        });
    }

    doEmailVerification();

    return(
        <p>Your email has been verified. You may now log in.</p>
    );
}

export default EmailVerification;