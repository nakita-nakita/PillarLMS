import React from 'react';
import HomeIcon from '@mui/icons-material/Home';

const DisplayFooter = (props) => {
  const { user, system } = props?.data || {};

  return (
    <div>
      <div className="text-center py-8 bg-blue-800 text-gray-200">
        &copy; 2023 Your Company. All rights reserved.
      </div>
    </div>
  );
};

export default DisplayFooter;
