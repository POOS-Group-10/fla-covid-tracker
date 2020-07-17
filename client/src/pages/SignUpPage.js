import React from 'react';
import SignUp from '../components/SignUp';
import PageTitle from '../components/PageTitle';

const SignUpPage = () =>
{
    return(
        <div>
                 <div class="covidBorder">
            <div class="padding">
                <div class="textBorder">  
            <PageTitle /> 
                <SignUp />
            </div>
            </div>
            </div>
        </div>
    );
}

export default SignUpPage;
