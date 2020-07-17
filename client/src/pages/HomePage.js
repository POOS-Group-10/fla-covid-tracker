import React from 'react';
import Home from '../components/Home';
import PageTitle from '../components/PageTitle';
import Covid from '../components/Covid';
import News from '../components/News';

const HomePage = () =>
{
    return(
        <div>
            <PageTitle />
                <Home />
                <Covid />
                <News />
        </div>
    );
}

export default HomePage;