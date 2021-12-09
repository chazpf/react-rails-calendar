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
    <div className="auth mr-10 border border-0 border-b-2 pb-2 border-gray-200">
      {errors &&
        <div className="p-2 bg-yellow-500 rounded-lg">{errors}</div>
      }
      {isLoggedIn ?
        <>
          <span className='mb-1 mr-2'>{user.username}</span>
          <button className="mt-1 px-1 border rounded" onClick={handleLogout}>Logout</button>
        </> :
        <>
          {showLogin ?
            <>
              <Login
                setErrors={setErrors}
                handleSetLogin={handleSetLogin}
              />
              <button className="px-1 mb-1_2 border rounded" onClick={toggleShowLogin}>Sign up instead?</button>
            </> :
            <>
              <Signup
                setErrors={setErrors}
                handleSetLogin={handleSetLogin}
              />
              <button className="px-1 border rounded" onClick={toggleShowLogin}>Log in instead?</button>
            </>
          }
        </>
      }
    </div>
  )
}

export default UserAuth;
