import React from 'react';
import Login from '../components/Login';
import PageTitle from '../components/PageTitle';

const LoginPage = () =>
{
    return(
        <div className="covidBorder">
        <div className="padding">
            <div className="textBorder"> 
            <PageTitle />      
                 <div className="padding"></div>
                 <h1><strong>Login</strong></h1>
               
                 <Login />
            </div> 
        </div>
    </div>
    );
}

export default LoginPage;