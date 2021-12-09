import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ handleSetLogin, setErrors }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

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

    const token = document.querySelector('[name=csrf-token]').content;
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token;

    const user = {
      username,
      password,
      password_confirmation: passwordConfirm
    };

    axios.post('/users', {user}, {withCredentials: true})
      .then(response => {
        if (response.data.status === 'created') {
          setErrors('')
          handleSetLogin(response.data)
        } else {
          setErrors(response.data.errors)
        }
      })
      .catch(error => console.log('api errors: ', error));
  };

  return (
    <div>
      <h1 className="mr-10 mb-1 text-xl text-gray-500 font-bold">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="username" type="text" name="username" value={username} onChange={handleChange} /><br/>
        <input placeholder="password" type="password" name="password" value={password} onChange={handleChange} /><br/>
        <input placeholder="confirm password" type="password" name="passwordConfirm" value={passwordConfirm} onChange={handleChange} /><br/>
        <button className="px-1 mt-1 mb-1 border rounded" type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
