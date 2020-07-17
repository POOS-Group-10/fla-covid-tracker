import React from 'react';
import Blog from '../components/Blog';
import PageTitle from '../components/PageTitle';

const BlogPage = () =>
{
    return(
        <div>
                 <div class="covidBorder">
            <div class="padding">
                <div class="textBorder">  
                <PageTitle />
                <Blog />
            </div>
            </div>
            </div>
        </div>
    );
}

export default BlogPage;
