import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import LoginHub from './LoginHub';
import Post from './Post';
const Blog = () =>
{

    //function for username call goes after "weclome" 
    return(
        <div>
        <LoginHub />
        <div id="outline">
        <div className="form-input-left">
          <button><Link to="/CreatePost">Create a Post</Link></button>
          
          <input
            type="text"
            placeholder="Find A Post"
            name="username"
          />
        </div>
        <button>Search</button>
        </div>
        <br />
        <Post />
        <br />
        </div>
    );
}

export default Blog;
