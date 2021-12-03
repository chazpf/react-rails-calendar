import React from 'react';
import UserAuth from './UserAuth';

const CalendarHeader = ({ isLoggedIn, user, handleSetLogin, handleSetLogout }) => {
  return (
    <>
      <UserAuth
        isLoggedIn={isLoggedIn}
        user={user}
        handleSetLogin={handleSetLogin}
        handleSetLogout={handleSetLogout}
      />
    </>
  );
};

export default CalendarHeader;
