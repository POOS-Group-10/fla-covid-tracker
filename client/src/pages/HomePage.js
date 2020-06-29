import React from 'react';
import Login from '../components/Login';
import PageTitle from '../components/PageTitle';

const HomePage = () =>
{
    return(
        <div>
            <PageTitle />
                <Login />
        </div>
    );
}

export default HomePage;