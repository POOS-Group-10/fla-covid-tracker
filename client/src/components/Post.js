import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { Redirect } from "react-router-dom";

const Post = () =>
{
    const toBlogPost = () => {
        window.location.href = '/Post'
      }
    return(
        <div id = "blog" onClick={toBlogPost}>
            <h1 class="up">This is a blog paaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaost there</h1>
            <div class="divider"></div>
            <h3>test</h3>
        </div>
    );
}

export default Post;