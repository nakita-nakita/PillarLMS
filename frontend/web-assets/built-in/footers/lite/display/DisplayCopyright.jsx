import React from 'react';
import HomeIcon from '@mui/icons-material/Home';

const DisplayCopyright = (props) => {
  // imports
  const { system } = props.data;
  const {
    // colors
    isDayMode,
    isNightMode,
  } = system.state

  const backgroundColorClass = isDayMode ? "bg-stone-400" : "bg-stone-700"
  const backgroundColorTextClass = isDayMode ? "text-gray-800" : "text-gray-200"

  return (
    <div>
      <div className={`text-center py-8 ${backgroundColorClass} ${backgroundColorTextClass}`}>
        &copy; 2023 Your Company. All rights reserved.
      </div>
    </div>
  );
};

export default DisplayCopyright;
