import React from 'react';
import axios from 'axios';

import './App.css';

class App extends React.Component {

  state = {
    name: '',
    email: '',
    password: '',
    posts: []
  };

  componentDidMount = () => {
    this.getBlogPost();
  };

  getBlogPost = () => {
    axios.get('/api')
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data});
        console.log('Data has been received');
      })
      .catch((e) => {
        alert('Error retrieving data ' + e); // Don't alert in real world apps, fool.
      });
  };

  // event in this case is "onChange", it's whatever event you slap in the HTML element
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  submit = (event) => {
    event.preventDefault(); // Stops the browser from refreshing

    const payload = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    axios({
      url: '/api/save', // React app is communicating with the server by this route
      method: 'POST', // GET is used by default
      data: payload
    })
      // These are promises
      .then(() => {
        console.log('Data has been sent to the server');
        this.resetUserInputs();
        this.getBlogPost();
      })
      .catch(() => {
        console.log('Internal server error');
      });
  };

  resetUserInputs = () => {
    this.setState({
      name: '',
      email: '',
      password: '',
      posts: []
    });
  };

  displayBlogPost = (posts) => {
    if (!posts.length) return null; // end function if 'posts' is empty.

    return posts.map((post, index) => (
      <div key={index} className="blog-post__display">
        <h3>{post.name}</h3>
        <h3>{post.email}</h3>
        <h3>{post.password}</h3>
      </div>
    ));
  };

  render() {

    console.log('State: ', this.state);

    // JSX
    return(
      <div className="app">
        <h2>Test MERN Stack Group 10</h2>
        <form onSubmit={this.submit}>
          <div className = "form-input">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </div>
          <div className = "form-input">
            <textarea
              type="text"
              placeholder="Email"
              name="email"
              value={this.state.body}
              onChange={this.handleChange}
            >
            </textarea>
          </div>
          <div className = "form-input">
            <textarea
              type="text"
              placeholder="Password"
              name="password"
              value={this.state.body}
              onChange={this.handleChange}
            >
            </textarea>
          </div>
          <button>Submit</button>
        </form>

        <div className="blog-">
          {this.displayBlogPost(this.state.posts)}
        </div>
      </div>
    );
  }
}

export default App;
