import React, { useState } from 'react';
import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import ReactOnRails from 'react-on-rails';

const Login = ({ handleSetLogin, setErrors }) => {
  // const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [errors, setErrors] = useState('');

  const handleChange = (event) => {
    const {name, value} = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = document.querySelector('[name=csrf-token]').content;
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token;

    const user = {
      username,
      password,
    };

    axios.post('/login', {user}, {withCredentials:true})
      .then(response => {
        if (response.data.logged_in) {
          handleSetLogin(response.data);
          // navigate('/')
        } else {
          setErrors(response.data.errors)
        }
      })
      .catch(error => console.log('api errors: ', error));
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="username" type="text" name="username" value={username} onChange={handleChange} />
        <input placeholder="password" type="password" name="password" value={password} onChange={handleChange} />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
