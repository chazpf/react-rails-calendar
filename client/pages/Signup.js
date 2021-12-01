import React, { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';

const Signup = ({handleLogin}) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState('');

  const handleChange = (event) => {
    const {name, value} = event.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'passwordConfirm') {
      setPasswordConfirm(value)
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      username,
      password,
      password_confirmation: passwordConfirm
    };
    axios.post('/users', {user}, {withCredentials: true})
      .then(response => {
        if (response.data.status === 'created') {
          handleLogin(response.data)
          navigate('/')
        } else {
          setErrors(response.data.errors)
        }
      })
      .catch(error => console.log('api errors: ', error));
  };

  return (
    <div>
      <h1>Sign Up</h1>
      {errors &&
        <div>{errors}</div>
      }
      <form onSubmit={handleSubmit}>
        <input placeholder="username" type="text" name="username" value={username} onChange={handleChange} />
        <input placeholder="password" type="password" name="password" value={password} onChange={handleChange} />
        <input placeholder="confirm password" type="password" name="passwordConfirm" value={passwordConfirm} onChange={handleChange} />
        <button type="submit">Sign Up</button>
        <div>
          or <Link to='/login'>log in</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
