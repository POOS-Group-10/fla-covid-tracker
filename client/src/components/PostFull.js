import React from 'react';
import '../App.css';
import Post from './Post';
const PostFull = () =>
{
    return(
        <div>
        <br></br>
        <Post />
        <br></br>
        <div class = "textBorder">
        <br></br>
        <div>
                    <textarea            
                    cols="50"
                    rows="20"
                    type="text"
                    placeholder="Type a Comment"
                    name="postBody"
                    
                    />
                </div>
        <button>Reply</button>
        <h1>Comments:</h1>   
        </div>
        <br></br>
        <div id = "blogComment">
            <p>
             This is a comment   
            </p>
        </div>
        </div>
    );
}
export default PostFull;