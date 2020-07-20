import React from 'react';
import Login from '../components/Login';
import PageTitle from '../components/PageTitle';

const LoginPage = () =>
{
    return(
        <div class="covidBorder">
        <div class="padding">
            <div class="textBorder"> 
            <PageTitle />      
                 <div class="padding"></div>
                 <h1><strong>Login</strong></h1>
               
                 <Login />
            </div> 
        </div>
    </div>
    );
}

export default LoginPage;