import React, { useContext } from 'react';
import UserAuth from './UserAuth';
import dayjs from 'dayjs';
import GlobalContext from '../contexts/GlobalContext'

const CalendarHeader = () => {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  const handleReset = () => {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  };

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  }

  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  }

  return (
    <header className="px-4 py-2 flex items-center">
      <UserAuth />
      <h1 className="mr-10 text-xl text-gray-500 font-bold">Calendar</h1>
      <button
        onClick={handleReset}
        className="border rounded py-2 px-4 mr-5 cursor-pointer"
      >
        Today
      </button>
      <button onClick={handlePrevMonth}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          chevron_left
        </span>
      </button>
      <button onClick={handleNextMonth}>
        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
          chevron_right
        </span>
      </button>
      <h2 className="ml-4 text-xl text-gray-500 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h2>
    </header>
  );
};
// onClick={handlePrevMonth}
// onClick={handleReset}
// onClick={handleNextMonth}


export default CalendarHeader;
