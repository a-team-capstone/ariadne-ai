import React from 'react';

const Form = () => {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="username"
          className="form-control"
          placeholder="Enter username"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
};

export default Form;
