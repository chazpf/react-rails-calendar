import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState('');

  const handleLogin = (data) => {
    setIsLoggedIn(true);
    setUser(data.user);
  };

  const handleLogout = () => {
    const token = document.querySelector('[name=csrf-token]').content;
    axios.defaults.headers.common['X-CSRF-TOKEN'] = token;

    axios.post('/logout', {withCredentials:true})
      .then(response => {
        if (response.data.logged_out) {
          setIsLoggedIn(false);
          setUser({});
        } else {
          setErrors(response.data.errors)
        }
      })
      .catch(error => console.log('api errors: ', error));
  };

  const getLoginStatus = () => {
    axios.get('/logged_in', {withCredentials: true})
      .then(response => {
        if (response.data.logged_in) {
          handleLogin(response.data)
        } else {
          if (isLoggedIn){
            handleLogout();
          } else {
            setIsLoggedIn(false);
            setUser({});
          }
        }
      });
  };

  useEffect(() => {
    getLoginStatus();
  }, []);

  return (
    <>
      <h1>App</h1>
      {errors &&
        <div>{errors}</div>
      }
      {isLoggedIn ?
        <>
        <p>Logged In</p>
        <button onClick={handleLogout}>Log out</button>
        </> :
        <p>Not Logged In</p>
      }
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route exact path='/login' element={<Login handleLogin={handleLogin}/>}/>
          <Route exact path='/signup' element={<Signup handleLogin={handleLogin}/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
};

export default App;
