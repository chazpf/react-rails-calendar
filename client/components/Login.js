import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ handleSetLogin, setErrors }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
          setErrors('')
          handleSetLogin(response.data);
        } else {
          setErrors(response.data.errors)
        }
      })
      .catch(error => console.log('api errors: ', error));
  };

  return (
    <div>
      <h1 className="mr-10 text-xl text-gray-500 font-bold">Login</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="username" type="text" name="username" value={username} onChange={handleChange} /><br/>
        <input placeholder="password" type="password" name="password" value={password} onChange={handleChange} /><br/>
        <button className="mt-1 border rounded" type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
