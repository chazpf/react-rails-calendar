import React, { useContext } from 'react';
import GlobalContext from '../contexts/GlobalContext';

const Labels = () => {
  const { labels, updateLabel } = useContext(GlobalContext);

  return (
    <>
      <p className="text-gray-500 font-bold mt-10">Labels</p>
      {labels.map(({label: lbl, checked}, idx)=>(
        <label key={idx} className="items-center mt-3 block">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => updateLabel({label: lbl, checked: !checked})}
            className={`h-5 w-5 bg-${lbl}-200 rounded`}
          />
          <span className={`ml-2 text-gray-700 p-2 bg-${lbl}-200`}>{lbl}</span>
        </label>
      ))}
    </>
  )
}

export default Labels;
