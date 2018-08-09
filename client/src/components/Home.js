import React, { Component } from 'react';
import Form from './Form';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div>
        <h2>ariadne.ai</h2>
        <p>Welcome</p>
        <Form />
        <a href="/auth/google">
          <button type="button" className="btn btn-primary">
            Sign in with Google
          </button>
        </a>
        <Link to="/sign-up">
          <button type="button" className="btn btn-secondary">
            Sign up
          </button>
        </Link>
      </div>
    );
  }
}

export default Home;
