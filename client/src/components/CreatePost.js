import '../App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

const CreatePost = () => 
{  

    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [userName, setUserName] = useState('');
    const [userCounty, setUserCounty] = useState('');

    const url = 'https://florida-covid-tracking.herokuapp.com/api/profile';
        
    async function fetchData(){
        const response = await fetch(url, {
        method:'POST',
        headers:{'Content-Type': 'application/json'}
    })
    .then((res) => res.json())
    .then((json) => {
        console.log('in create post, json is ' + json.userName + ' ' + json.county)
        setUserName(json.userName)
        setUserCounty(json.county)
    })
    .catch(err => 
    {
        console.log(err)
    })
    }

    const savePost = async (event) =>
    {
        event.preventDefault();

        console.log(postTitle + ' ' + postBody + ' ' + userName + ' ' + userCounty)
        const payload = {
            title: postTitle,
            body: postBody,
            user: userName,
            county: userCounty    
        }

        axios({
            url: '../api/createPost',
            method: 'POST',
            data: payload
        })
        .then(() => {
            return <Redirect to='/Blog' />
        })
    }

    useEffect(() => {
        fetchData();
    }, [])

        return(
            <div className="app">
                <form onSubmit={savePost}>
                <div className = "form-input">
                    <input
                    type="text"
                    name="postTitle"
                    placeholder="Post Header"
                    onChange={e => setPostTitle(e.target.value)}
                    />
                </div>
                <br></br>
                <div className = "form-input">
                    <textarea
                    cols="75"
                    rows="20"
                    type="text"
                    placeholder="Post Content"
                    name="postBody"
                    onChange={e => setPostBody(e.target.value)}
                    />
                </div>
                <button>Submit Post</button>
                </form>
            </div>
        );

}

export default CreatePost;
