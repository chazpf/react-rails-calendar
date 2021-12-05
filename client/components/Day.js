import React, { useState, useContext, useEffect } from 'react';
import dayjs from 'dayjs';
import GlobalContext from '../contexts/GlobalContext'

const Day = ({ day, rowIdx }) => {
  const [dayEvents, setDayEvents] = useState([]);

  const { isLoggedIn, setDaySelected, setShowEventModal, filteredEvents, setSelectedEvent } = useContext(GlobalContext);

  const getCurrentDayClass = () => {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY')
      ? 'bg-blue-600 text-white rounded-full w-7'
      : '';
  };

  const cursorClass = () => {
    return isLoggedIn ? 'cursor-pointer' : ''
  };

  useEffect(() => {
    const events = filteredEvents.filter(evt => {
      return dayjs(evt.day).format('DD-MM-YY') === day.format('DD-MM-YY')
    });
    setDayEvents(events);
  }, [filteredEvents, day]);

  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">
            {day.format('ddd').toUpperCase()}
          </p>
        )}
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
          {day.format('DD')}
        </p>
      </header>
      <div className={`flex-1 ${cursorClass()}`} onClick={() => {
        if (isLoggedIn) {
          setDaySelected(day)
          setShowEventModal(true)
        }
      }}>
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
            onClick={() => setSelectedEvent(evt)}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Day;
