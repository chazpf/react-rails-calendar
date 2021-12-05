import React from 'react';

const GlobalContext = React.createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  user: {},
  setUser: () => {},
  monthIndex: 0,
  setMonthIndex: index => {},
  smallCalenderMonth: 0,
  setSmallCalenderMonth: index => {},
  daySelected: null,
  setDaySelected: day => {},
  showEventModal: false,
  setShowEventModal: () => {},
  dispatchCalEvent: ({ type, payload }) => {},
  savedEvents: [],
  selectedEvent: null,
  setSelectedEvent: () => {},
  labels: [],
  setLabels: () => {},
  updateLabel: () => {},
  filteredEvents: [],
});

export default GlobalContext;
