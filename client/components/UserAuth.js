import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Login from './Login';
import Signup from './Signup';
import GlobalContext from '../contexts/GlobalContext';

const UserAuth = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [errors, setErrors] = useState('');
  const { isLoggedIn, setIsLoggedIn, user, setUser, dispatchCalEvent } = useContext(GlobalContext);

  const toggleShowLogin = () => {
    setShowLogin(!showLogin);
  };

  const handleSetLogin = (data) => {
    setErrors('');
    setIsLoggedIn(true);
    setUser(data.user);
    axios.get('/api/v1/events/index', {withCredentials: true})
      .then(response => {
        const userEvents = response.data.filter(event => event.user_id === data.user.id)
        dispatchCalEvent({type:'get', payload: userEvents});
      })
  };

  const handleSetLogout = () => {
    setIsLoggedIn(false);
    setUser({});
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
