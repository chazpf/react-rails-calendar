import React, { useState, useEffect, useReducer, useMemo } from 'react';
import GlobalContext from './GlobalContext';
import dayjs from 'dayjs';

const savedEventsReducer = (state, {type, payload}) => {
  switch (type) {
    case 'get':
      let fixedPayload = payload.map(event => {
        return {...event, day: parseInt(event.day)}
      })
      return fixedPayload;
    case 'push':
      fixedPayload = {...payload, day: parseInt(payload.day)}
      return [...state, fixedPayload];
    case 'update':
      fixedPayload = {...payload, day: parseInt(payload.day)}
      return state.map(evt => evt.id === fixedPayload.id ? fixedPayload : evt);
    case 'delete':
      return state.filter(evt => evt.id !== payload.id);
    default:
      throw new Error();
  }
};

const initEvents = () => {
  return [];
};

export default function ContextWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalenderMonth, setSmallCalenderMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);

  const [savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer, [], initEvents);

  const filteredEvents = useMemo(() => {
    return savedEvents.filter(evt =>
      labels
        .filter(lbl => lbl.checked)
        .map(lbl => lbl.label)
        .includes(evt.label));
  }, [savedEvents, labels]);

  const updateLabel = (label) => {
    setLabels(labels.map(lbl => lbl.label === label.label ? label : lbl));
  };

  useEffect(() => {
    if (smallCalenderMonth !== null) {
      setMonthIndex(smallCalenderMonth);
    }
  }, [smallCalenderMonth]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  useEffect(() => {
      setLabels(prevLabels => {
        return [...new Set(savedEvents.map(evt => evt.label))].map(
          label => {
            const currentLabel = prevLabels.find(lbl => lbl.label === label);
            return {
              label,
              checked: currentLabel ? currentLabel.checked : true,
            };
          }
        );
      });
    }, [savedEvents]);

  return (
    <GlobalContext.Provider value={{
      isLoggedIn,
      setIsLoggedIn,
      user,
      setUser,
      monthIndex,
      setMonthIndex,
      smallCalenderMonth,
      setSmallCalenderMonth,
      daySelected,
      setDaySelected,
      showEventModal,
      setShowEventModal,
      dispatchCalEvent,
      savedEvents,
      selectedEvent,
      setSelectedEvent,
      labels,
      setLabels,
      updateLabel,
      filteredEvents
    }}>
      {props.children}
    </GlobalContext.Provider>
  )
};
