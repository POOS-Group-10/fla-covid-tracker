import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const Post = () =>
{
    const [postTitle, setPostTitle] = useState('')
    const [postBody, setPostBody] = useState('')
    const [comments, setComments] = useState([])
    const [commentBody, setCommentBody] = useState('')
    const [userName, setUserName] = useState('')

    var commentList = []

    const url = 'https://florida-covid-tracking.herokuapp.com/api/profile';
    // const url = 'http://localhost:3000/api/profile';

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

    const getPostAndComments = () => {

        const URL = window.location.pathname;
        const postURL = 'Posts/';
        const user = URL.slice(URL.indexOf(postURL) + postURL.length, URL.lastIndexOf('/'));
        console.log(user + ' kek')
        const date = (URL.slice(URL.indexOf(user + '/') + (user + '/').length, ))
        console.log('kek ' + date)

        console.log('current user in post.js is ' + userName)

        const payload = {
            userName: user,
            date: date
        }

        console.log("stuff: " + payload.userName + ' ' + payload.date)

        axios({
            url: '../../api/getUserPost',
            method: 'POST',
            data: payload
        })
        .then((response) => {
            console.log('post.js ' + response.data[0].user)
            setPostTitle(response.data[0].title)
            setPostBody(response.data[0].body)
        })
        .catch((error) => {
            console.log('post.js error is: ' + error)
        })

        const postid = user + date;
        const newPayload = {
            postid: postid
        }

        axios({
            url: '../../api/getComments',
            method: 'POST',
            data: newPayload
          })
          .then((response) => {
            console.log('getComments response: ' + response + ' ' + response.data[0].user)
            var x;
            for (x in response.data)
              commentList.push(response.data[x])
            console.log('post list array is: ' + commentList)
            setComments(commentList)
            console.log('posts state is: ' + comments)
          })
          .catch((error) => {
            console.log('error getting blog posts ' + error)
          })
    }

    const postComment = () => {

        const URL = window.location.pathname;
        const postURL = 'Posts/';
        const user = URL.slice(URL.indexOf(postURL) + postURL.length, URL.lastIndexOf('/'));
        console.log(user)
        const date = URL.slice(URL.indexOf(user + '/') + (user + '/').length, )
        const postid = user + date
        console.log(date + ' and ' + user + date + ' and lastly ' + commentBody)

        const payload = {
            body: commentBody,
            user: userName, 
            postid: postid
        }

        axios({
            url: '../../api/postComment',
            method: 'POST',
            data: payload
        })
        .then((response) => {
            console.log('success in postComment: ' + response.data.postid)
        })
        .catch((error) => {
            console.log('you are bad and you should feel bad: ' + error)
        })
    }

    const displayComments = (comments) => {
        if (!comments.length) return null; // end function if 'posts' is empty.
        console.log('in display blog posts: ' + comments[0]._id)
        return comments.map((comment, index) => (
          <div>
          <div key={index} id="blogComment">
            <h3 style="rightAlign">From: {comment.user}</h3>]
            <div className="divider"></div>
            <h3>{comment.body}</h3>
          </div>
          <br></br>
          </div>
        ));
      };

    useEffect(() => {
        fetchData();
        getPostAndComments();
    }, [])

    return(
          <div>
            <br></br>
            <div id = "blogComment">
                <h1>{postTitle}</h1>
                <div className="divider"></div>
                <h3>{postBody}</h3>
            </div>
            <br></br>
            <div class="textBorder">
                <br></br>
                <div className="form-submit-left">
                 <form onSubmit={postComment}>
                 <textarea           
                    cols="50"
                    rows="20"
                    type="text"
                    placeholder="Type a Comment"
                    name="postBody"
                    onChange={(e) => setCommentBody(e.target.value)}      
                    />                       
                        <br></br>
                        <button>Reply</button>
                    </form>
                </div>
            </div>
            <br></br>
            <div>
                {displayComments(comments)}
            </div>
            <br></br>
           </div>
    );
}

export default Post;