import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const Post = () =>
{
    const [postTitle, setPostTitle] = useState('')
    const [postBody, setPostBody] = useState('')
    const [comments, setComments] = useState([])

    const getPost = () => {

        const URL = window.location.pathname;
        const postURL = 'Posts/';
        const user = URL.slice(URL.indexOf(postURL) + postURL.length, URL.lastIndexOf('/'));
        console.log(user)
        const date = URL.slice(URL.indexOf(user + '/') + (user + '/').length, )
        console.log(date)

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
    }

    useEffect(() => {
        getPost();
    }, [])

    return(
        <div id = "blog">
            <h1>{postTitle}</h1>
            <p>{postBody}</p>
        </div>
    );
}

export default Post;