import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './Login';
import Signup from './Signup';

const UserAuth = ({ isLoggedIn, user, handleSetLogin, handleSetLogout }) => {
  const [showLogin, setShowLogin] = useState(true);
  const [errors, setErrors] = useState('');

  const toggleShowLogin = () => {
    setShowLogin(!showLogin);
  };

  const handleLogout = () => {
    const token = document.querySelector('[name=csrf-token]').content;
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token;

    axios.post('/logout', {withCredentials:true})
      .then(response => {
        if (response.data.logged_out) {
          handleSetLogout();
          location.reload();
        } else {
          setErrors(response.data.errors);
        }
      })
      .catch(error => console.log('api errors: ', error));
  };

  const getLoginStatus = () => {
    axios.get('/logged_in', {withCredentials: true})
      .then(response => {
        if (response.data.logged_in) {
          handleSetLogin(response.data)
        } else {
          if (isLoggedIn){
            handleLogout();
          } else {
            handleSetLogout();
          }
        }
      });
  };

  useEffect(() => {
    getLoginStatus();
  }, []);

  return (
    <>
      {errors &&
        <div>{errors}</div>
      }
      {isLoggedIn ?
        <>
          <p>Hi, {user.username}</p>
          <button onClick={handleLogout}>Logout</button>
        </> :
        <>
          {showLogin ?
            <>
              <Login
                setErrors={setErrors}
                handleSetLogin={handleSetLogin}
              />
              <button onClick={toggleShowLogin}>Need an account?</button>
            </> :
            <>
              <Signup
                setErrors={setErrors}
                handleSetLogin={handleSetLogin}
              />
              <button onClick={toggleShowLogin}>Already have an account?</button>
            </>
          }
        </>
      }
    </>
  )
}

export default UserAuth;
