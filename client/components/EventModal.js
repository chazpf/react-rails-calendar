import React, { useState, useContext } from 'react';
import GlobalContext from '../contexts/GlobalContext';
import axios from 'axios';
import dayjs from 'dayjs';

const labelsClasses = ['indigo', 'gray', 'green', 'blue', 'red', 'purple'];

const EventModal = () => {
  const { user, setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } = useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '');
  const [description, setDescription] = useState(selectedEvent ? selectedEvent.description : '');
  const [selectedLabel, setSelectedLabel] = useState(selectedEvent ? selectedEvent.label : labelsClasses[0]);
  const [errors, setErrors] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const calendarEvent = {
      title: title || 'New Event',
      description: description || 'No Description',
      label: selectedLabel,
      day: daySelected.valueOf(),
      user_id: user.id
    }
    if (selectedEvent) {
      axios.put(`/api/v1/events/${selectedEvent.id}`, calendarEvent)
        .then(response => {
          if (response.data.id) {
            dispatchCalEvent({type: 'update', payload: response.data});
            setShowEventModal(false);
          } else {
            setErrors(response.data.errors);
          }
        })
    } else {
      axios.post('/api/v1/events/create', calendarEvent)
        .then(response => {
          if (response.data.id) {
            dispatchCalEvent({type: 'push', payload: response.data});
            setShowEventModal(false);
          } else {
            setErrors(response.data.errors);
          }
        });
    }
  };

  const handleDeleteEvent = e => {
    e.preventDefault();
    axios.delete(`/api/v1/events/${selectedEvent.id}`)
      .then(response => {
        if (response.data.notice) {
          dispatchCalEvent({type:'delete', payload: selectedEvent});
          setShowEventModal(false);
        } else {
          setErrors(response.data.errors);
        }
      });
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center iterms-center">
      <form className="bg-white rounded-lg shadow-2xl w-1_4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <div>
            {selectedEvent &&
              <button onClick={handleDeleteEvent}>
                <span className="material-icons-outlined text-gray-400">
                  delete
                </span>
              </button>
            }
            <button onClick={() => setShowEventModal(false)}>
              <span className="material-icons-outlined text-gray-400">
                close
              </span>
            </button>
          </div>
        </header>
        {errors && <p>{errors}</p>}
        <div className="p-3">
          <div className="grid grid-cols-1_5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200"
              onChange={e => setTitle(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              schedule
            </span>
            <p>{daySelected.format('ddd, MMMM DD, YYYY')}</p>
            <span className="material-icons-outlined text-gray-400">
              segment
            </span>
            <input
              type="text"
              name="description"
              placeholder="Add description"
              value={description}
              required
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200"
              onChange={e => setDescription(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              bookmark_border
            </span>
            <div className="flex gap-x-2">
              {labelsClasses.map(((lblClass, i) => (
                <span
                  key={i}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                  onClick={() => setSelectedLabel(lblClass)}
                >
                  {selectedLabel === lblClass &&
                    <span className="material-icons-outlined text-white text-sm">
                      check
                    </span>
                  }
                </span>
              )))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button onClick={handleSubmit} type="submit" className="bg-blue-500 px-6 py-2 rounded text-white">
            Save
          </button>
        </footer>
      </form>
    </div>
  );
};

export default EventModal;
