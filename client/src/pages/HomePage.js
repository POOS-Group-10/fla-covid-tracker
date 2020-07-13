import React from 'react';
import Home from '../components/Home';
import PageTitle from '../components/PageTitle';
import Covid from '../components/Covid';

const HomePage = () =>
{
    return(
        <div>
            <PageTitle />
                <Home />
                <Covid />
        </div>
    );
}

export default HomePage;