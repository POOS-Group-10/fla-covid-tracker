import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../App.css';
import LoginHub from './LoginHub';
import Post from './Post';
import axios from 'axios';

const Blog = () =>
{
    const [posts, setPosts] = useState([]);
    const [userName, setUserName] = useState('');

    const url = 'https://florida-covid-tracking.herokuapp.com/api/profile';

    const getBlogPosts = () => {
      axios({
        url: '../api/getPosts',
        method: 'GET'
      })
      .then((response) => {
        setPosts(response)
      })
      .catch((error) => {
        console.log('error getting blog posts ' + error)
      })
    }

    useEffect(() => {
      getBlogPosts();
    })

    async function fetchData(){
      const response = await fetch(url, {
      method:'POST',
      headers:{'Content-Type': 'application/json'}
      })
      .then((res) => res.json())
      .then((json) => {
          setUserName(json.userName)
      })
      .catch(err => 
      {
          console.log(err)
      })
    }

    const toCreatePost = () => {
      window.location.href = '/CreatePost'
    }

    fetchData();

    //function for username call goes after "weclome" 
    return(
        <div>
        <LoginHub />
        <div id="outline">
        <div className="form-input-left">
          <button onClick={toCreatePost}>Create a Post</button>
          
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
