import '../App.css';
import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CreatePost = () => 
{   
    /* const [title, setPostTitle] = useState('');
    const [content, setPostContent] = useState('');

    const doSignUp = async event => 
    {    
        event.preventDefault(); // Stops the browser from refreshing
    
        const payload = {
            postTitle: title,
            postContent: content,
        };
        
        axios({
            url: '../api/findUser',
            method: 'POST',
            data: {userName: payload.userName}
        })
        .then((response) => {
            console.log(response.data.taken);
            if (response.data.taken === "1") {
                setMessage(response.data.msg);
                return;
            }
            else {
                axios({
                    url: '../api/SignUp', // React app is communicating with the server by this route
                    method: 'POST', // GET is used by default
                    data: payload
                })
                // These are promises
                    .then(() => {
                      setMessage(response.data.msg);
                    })
                    .catch(() => {
                      console.log('Internal server error');
                    });
            }
        })
        .catch((error) => {
            console.log(error);
        });
    };
 */
        return(
            <div  className="app">
                <div className = "form-input-left">
                    <input
                    type="text"
                    name="firstName"
                    placeholder="Post Header"
                   // onChange={e => setFirstName(e.target.value)}
                    />
                </div>
                <br></br>
                <div className = "form-input-left">
                    <textarea
                    cols="75"
                    rows="20"
                    type="text"
                    placeholder="Post Content"
                    name="email"
                   // onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <button>Submit Post</button>
            </div>
        );

}

export default CreatePost;
