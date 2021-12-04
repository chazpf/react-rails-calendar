import React from 'react';
import CreateEventButton from './CreateEventButton';
import SmallCalendar from './SmallCalendar'

const Sidebar = () => {


  return (
    <aside>
      <CreateEventButton />
      <SmallCalendar />
    </aside>
  );
};

export default Sidebar;
