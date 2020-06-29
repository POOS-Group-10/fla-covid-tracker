import React from 'react';
import Home from '../components/Home';
import PageTitle from '../components/PageTitle';

const HomePage = () =>
{
    return(
        <div>
            <PageTitle />
                <Home />
        </div>
    );
}

export default HomePage;