import React from 'react';
import Home from '../components/Home';
import PageTitle from '../components/PageTitle';
import FLmap from '../components/FL/FLmap.js';
const HomePage = () =>
{
    return(
        <div>
            <div class="padding">
                <div class="textBorder">
       
            <PageTitle />
                <Home />
                </div>
                </div>
                <FLmap />
        </div>        
    );
}

export default HomePage;