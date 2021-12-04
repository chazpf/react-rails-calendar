import React, { useState, useContext } from 'react';
import GlobalContext from '../contexts/GlobalContext';
import axios from 'axios';

const labelsClasses = ['indigo', 'gray', 'green', 'blue', 'red', 'purple'];

const EventModal = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState('');
  const [selectedLabel, setSelectedLabel] = useState(labelsClasses[0]);

  const { user, setShowEventModal, daySelected, dispatchCalEvent } = useContext(GlobalContext);

  const handleSubmit = e => {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      user_id: user.id
    }
    axios.post('/api/v1/events/create', calendarEvent)
      .then(response => {
        console.log(response);
        if (response.data.id) {
          dispatchCalEvent({type: 'push', payload: response.data});
          setShowEventModal(false);
        } else {
          setErrors(response.data.errors)
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
          <button onClick={() => setShowEventModal(false)}>
            <span className="material-icons-outlined text-gray-400">
              close
            </span>
          </button>
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
