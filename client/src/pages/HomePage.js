import React from 'react';
import Home from '../components/Home';
import PageTitle from '../components/PageTitle';
import Covid from '../components/Covid';
import News from '../components/News';

const HomePage = () =>
{
    return(
        <div>
                 <div class="padding">
                <div class="textBorder">
            <PageTitle />
                <Home />
                <Covid />
                </div>
                <br></br>
                <News />
                </div>
        </div>
    );
}

export default HomePage;