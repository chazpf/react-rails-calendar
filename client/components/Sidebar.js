import React, { useContext } from 'react';
import GlobalContext from '../contexts/GlobalContext'
import CreateEventButton from './CreateEventButton';
import SmallCalendar from './SmallCalendar'
import Labels from './Labels';

const Sidebar = () => {
  const { isLoggedIn } = useContext(GlobalContext);



  return (
    <aside className="sidebar w-sidebar">
      {isLoggedIn &&
        <CreateEventButton />
      }
      <SmallCalendar />
      <Labels />
    </aside>
  );
};

export default Sidebar;
