import React, { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import ReactOnRails from 'react-on-rails';

const Login = ({handleLogin}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');

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

    const csrfToken = ReactOnRails.authenticityToken();
    header = ReactOnRails.authenticityHeaders(otherHeader);

    const user = {
      username,
      password,
    };

    axios.post('/login', {user}, {withCredentials:true, header})
      .then(response => {
        if (response.data.logged_in) {
          handleLogin(response.data);
          navigate('/')
        } else {
          setErrors(response.data.errors)
        }
      })
      .catch(error => console.log('api errors: ', error.response.status, error.response));
  };

  return (
    <div>
      <h1>Login</h1>
      {errors &&
        <div>{errors}</div>
      }
      <form onSubmit={handleSubmit}>
        <input placeholder="username" type="text" name="username" value={username} onChange={handleChange} />
        <input placeholder="password" type="password" name="password" value={password} onChange={handleChange} />
        <button type="submit">Log In</button>
        <div>
          or <Link to='/signup'>sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
