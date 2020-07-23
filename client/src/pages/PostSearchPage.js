import React from 'react';
import PageTitle from '../components/PageTitle';
import LoginHub from '../components/LoginHub';
import PostSearch from '../components/PostSearch';

const PostSearchPage = () =>
{
    return(
        <div>
                 <div className="covidBorder">
            <div className="padding">
                <div className="textBorder">  
                <PageTitle />
                <LoginHub />
                </div>
                <PostSearch />
            </div>
            </div>
        </div>
    );
}

export default PostSearchPage;