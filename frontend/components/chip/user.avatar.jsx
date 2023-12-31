import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';

function avatarInitials(name) {
  const nameArray = name.split(' ')

  if (nameArray[1]) {
    return `${nameArray[0][0].toUpperCase()}${nameArray[nameArray.length - 1][0].toUpperCase()}`
  }
  if (nameArray[0]) {
    return `${nameArray[0][0].toUpperCase()}`
  }

  return undefined
}

export default function UserAvatar({ email, firstName, lastName, username, callByType, picture, labelColor, circleColor }) {
  const theme = useTheme()

  const [display, setDisplay] = useState('')

  if (!circleColor) {
    circleColor = "#f1f4f5"
  }

  if (!labelColor) {
    labelColor = "#000"
  }
  
  useEffect(() => {
    let fullname = "";
    if (firstName && lastName) {
      fullname = firstName + " " + lastName
    }

    switch (callByType) {
      case "EMAIL":
        setDisplay(email)
        break;
      case "USERNAME":
        setDisplay(username)
        break;
      case "FIRST_NAME":
        setDisplay(firstName)
        break;
      case "LAST_NAME":
        setDisplay(lastName)
        break;
      case "FULL_NAME":
        setDisplay(fullname)
        break;
      default:
        setDisplay(email)
        break;
    }
  }, [email, firstName, lastName, username, callByType])


  return (
    <Avatar
      // size="sm"
      src={picture ? `${process.env.NEXT_PUBLIC_WEB_API_URL}${picture}` : undefined}
      sx={{
        background: circleColor,
        color: `${theme.palette.getContrastText(circleColor)} !important`,
        border: `2px solid ${labelColor}`
      }}
      alt={display}
    >
      {display && avatarInitials(display)}
    </Avatar>
  );
}