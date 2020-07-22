import React from 'react';
import PageTitle from '../components/PageTitle';
import LoginHub from '../components/LoginHub';
import CreatePost from '../components/CreatePost';
import PostFull from '../components/PostFull';

const PostPage = () =>
{
    return(
        <div>
                 <div class="covidBorder">
            <div class="padding">
                <div class="textBorder">  
                <PageTitle />
                <LoginHub />
                </div>
                <br></br>
                <PostFull />

            </div>
            </div>
        </div>
    );
}

export default PostPage;