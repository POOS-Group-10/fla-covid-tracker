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
  const [search, setSearch] = useState('');

  const url = 'https://florida-covid-tracking.herokuapp.com/api/profile';
  // const url = 'http://localhost:3000/api/profile'

  var postList = []

  const getBlogPosts = () => {
    console.log('inside getblogposts')
    axios({
      url: '../api/getPosts',
      method: 'POST'
    })
    .then((response) => {
      console.log('getblogpost response: ' + response + ' ' + response.data[0].user)
      var x;
      for (x in response.data)
        postList.push(response.data[x])
      console.log('post list array is: ' + postList)
      setPosts(postList)
      console.log('posts state is: ' + posts)
    })
    .catch((error) => {
      console.log('error getting blog posts ' + error)
    })
  }

  const toPost = async (post, name) =>
  {
    console.log('post data is: ' + post + ' ' + name)
    // const url = 'http://localhost:3000/Posts/' + userName + '/' + name
    const url = 'https://florida-covid-tracking.herokuapp.com/Posts/' + userName + '/' + name
    console.log(url)
    window.location = url;
  }

  const searchPosts = (event) => {
    event.preventDefault();
    if (!search) return null;
      // var url = 'http://localhost:3000/search/' + search;
      var url = 'https://florida-covid-tracking.herokuapp.com/search/' + search;
    console.log('inside search posts: ' + url)
    window.location.href = '/search/' + search;
  }

  const displayBlogPosts = (posts) => {
    if (!posts.length) return null; // end function if 'posts' is empty.
    console.log('in display blog posts: ' + posts[0]._id)
    return posts.map((post, index) => (
      // <div>
      // <div key={index} id="blog">
      //   <button value={post.title} name={post.date} onClick={e => toPost(e.target.value, e.target.name)}>{post.title}</button>
      //   <p>{post.body}</p>
      // </div>
      // <br></br>
      // </div>

      <div id = "blog" value={post.title} name={post.date} onClick={e => toPost(e.target.value, e.target.name)}>
      <h1 class="up">{post.title}</h1>
      <div class="divider"></div>
      <h3>test</h3>
      </div>
    ));
  };

  useEffect(() => {
    getBlogPosts();
    console.log(posts);
  }, [])

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
        <form onSubmit={searchPosts}>
          <input
            type="text"
            placeholder="Find A Post"
            name="search"
            onChange={e => setSearch(e.target.value)}
          />
        <button>Search</button>
        </form>
        </div>
        </div>
        <br></br>
        <div>
          {displayBlogPosts(posts)}
        </div>
        </div>

    );
}

export default Blog;

{/* <div id = "blog" onClick={toBlogPost}>
            <h1 class="up">This is a blog paaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaost there</h1>
            <div class="divider"></div>
            <h3>test</h3>
        </div> */}