import React from 'react';
import Login from '../components/SignUp';
import PageTitle from '../components/PageTitle';

const RegistrationPage = () =>
{
    return(
        <div>
            <PageTitle />
                <SignUp />
        </div>
    );
}

export default RegistrationPage;