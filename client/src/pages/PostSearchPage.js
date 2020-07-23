import React from 'react';
import PageTitle from '../components/PageTitle';
import LoginHub from '../components/LoginHub';
import PostSearch from '../components/PostSearch';

const PostSearchPage = () =>
{
    return(
        <div>
                 <div class="covidBorder">
            <div class="padding">
                <div class="textBorder">  
                <PageTitle />
                <LoginHub />
                <PostSearch />
            </div>
            </div>
            </div>
        </div>
    );
}

export default PostSearchPage;