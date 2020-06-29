
import React from 'react';

import Header from '../components/RegisterHeader';

const SignUpPage = () =>
{
    return(
        <div>
            <Header />
            <SignUpUi />
        </div>
    );
}

export default SignUpPage;


function render() {

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
      </div>
    );
  }

  export default Register;