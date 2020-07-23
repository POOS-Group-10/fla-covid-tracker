import React from 'react';
import '../App.css';

const PostFull = () =>
{
    return(
        <div>
        <br></br>
        <div id = "blog">
            <h1>This is a blog post</h1>
            <br></br>
            <p>
             This is the blog area. weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeew!   
            </p>
        </div>
        <br></br>
        <div class = "textBorder">
        <br></br>
        <div id="outline">
        <div className="form-input-left">
          <input
            type="text"
            placeholder="Type a Comment"
            name="username"
          />
        </div>
        <button>Reply</button>
        </div>
        <h1>Comments:</h1>   
        </div>
        <br></br>
        <div id = "blog">
            <p>
             This is a comment   
            </p>
        </div>
        </div>
    );
}
export default PostFull;