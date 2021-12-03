import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { getMonth } from './util';
import GlobalContext from '../contexts/GlobalContext'
import CalendarHeader from './CalendarHeader';
import Sidebar from './Sidebar';
import Month from './Month';

const App = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const { monthIndex } = useContext(GlobalContext);

  const handleSetLogin = (data) => {
    setIsLoggedIn(true);
    setUser(data.user);
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
          shandleSetLogout();
          location.reload();
        } else {
          setErrors(response.data.errors);
        }
      })
      .catch(error => console.log('api errors: ', error));
  };

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      <div className="h-screen flex flex-col">
        <CalendarHeader
          isLoggedIn={isLoggedIn}
          user={user}
          handleSetLogin={handleSetLogin}
          handleSetLogout={handleSetLogout}
        />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currentMonth}/>
        </div>
      </div>
    </>
  );
};

export default App;
