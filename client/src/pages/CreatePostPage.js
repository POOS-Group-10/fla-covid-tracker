import React from 'react';
import LoginHub from '../components/LoginHub';
import PageTitle from '../components/PageTitle';
import CreatePost from '../components/CreatePost';

const CreatePostPage = () =>
{
    return(
        <div>
                 <div class="covidBorder">
            <div class="padding">
                <div class="textBorder">  
            <PageTitle /> 
            <LoginHub />
                <CreatePost />
            </div>
            </div>
            </div>
        </div>
    );
}

export default CreatePostPage;
