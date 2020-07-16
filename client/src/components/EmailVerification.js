import React from 'react';
import axios from 'axios';

import '../App.css';

const EmailVerification = () =>
{
    const doEmailVerification = async (event) =>
    {
        console.log(window.location.pathname.slice(19));
        axios({
            url: '../api/EmailVerification/' + window.location.pathname.slice(19),
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