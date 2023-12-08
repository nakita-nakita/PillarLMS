import React, { useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';

const FunctionalCopyright = (props) => {
  // imports
  const { system, user } = props.data;
  const {
    // colors
    isDayMode,
    isNightMode,
  } = system.state


  
  const renderSuggestedTextColorClass = (value) => {
    switch (value) {
      case "LIGHT":
        return `text-gray-200`

      case "DARK":
        return `text-gray-800`

      // default dark like browser
      default:
        return `text-gray-800`
    }
  }

  
  const textClass = renderSuggestedTextColorClass(
    isDayMode
      ? user.copyrightColorDay?.suggestedTextColor
      : user.copyrightColorNight?.suggestedTextColor
  )


  return (
    <div>
      {user.isCopyrightShowing && (
        <div className={`text-center py-8 bg-blue-800 ${textClass}`} style={{
          background: isDayMode
          ? user.copyrightColorDay?.color
          : user.copyrightColorNight?.color
        }}>
          &copy; 2023 {user.copyrightName || "Your Brand"}. All rights reserved.
        </div>
      )}
    </div>
  );
};

export default FunctionalCopyright;
