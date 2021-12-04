import React, { useContext } from 'react';
import GlobalContext from '../contexts/GlobalContext';

const CreateEventButton = () => {
    const { setShowEventModal } = useContext(GlobalContext);

  return (
    <button
      onClick={() => {
        setShowEventModal(true);
      }}
      className="border p-2 rounded-full flex items-center shadow-md"
    >
      <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
        add
      </span>
      <span className="pl-3 pr-7">Create</span>
    </button>
  );
}

export default CreateEventButton;
