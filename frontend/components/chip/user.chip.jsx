import React, { useState, useEffect } from 'react';

// mui
import { useTheme } from '@mui/material/styles';
// import Avatar from '@mui/joy/Avatar';
import Box from '@mui/material/Box';
// import Chip from '@mui/joy/Chip';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

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

export default function UserChip({ email, firstName, lastName, username, callByType, picturePreview, labelColor, circleColor, displayName }) {
  const theme = useTheme()

  const [display, setDisplay] = useState('')

  if (!circleColor) {
    circleColor = "#f1f4f5"
  }

  if (!labelColor) {
    labelColor = "#abf123"
  }

  useEffect(() => {
    if (!displayName) {

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
      }
    } else {
      setDisplay(displayName)
    }
  }, [email, firstName, lastName, username, callByType, displayName])

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      {/* <Chip avatar={<Avatar>M</Avatar>} label="Avatar" /> */}
      <Chip
        sx={{
          background: labelColor,
          color: theme.palette.getContrastText(labelColor),
          "&:hover": {
            color: theme.palette.grey[800]
          },
          cursor: "pointer"
        }}
        avatar={
          <Avatar
            size="sm"
            src={picturePreview ? `${process.env.NEXT_PUBLIC_WEB_API_URL}${picturePreview}` : undefined}
            sx={{
              background: circleColor,
              color: `${theme.palette.getContrastText(circleColor)} !important`
            }}
            alt={display}
          >
            {display && avatarInitials(display)}
          </Avatar>
        }
        label={display}
        variant="outlined"
      />
      {/* <Chip
        sx={{
          background: labelColor,
          color: theme.palette.getContrastText(labelColor),
          "&:hover": {
            color: theme.palette.grey[800]
          }
        }}
        variant="outlined"
        color="neutral"
        size="lg"
        startDecorator={
          <Avatar
            size="sm"
            src={picturePreview ? `${process.env.NEXT_PUBLIC_WEB_API_URL}${picturePreview}` : undefined}
            sx={{
              background: circleColor || defaultColor,
              color: theme.palette.getContrastText(circleColor || defaultColor)
            }}
            alt={display}
          />
        }
        // endDecorator={<CheckIcon fontSize="md" />}
        onClick={() => alert('You clicked the Joy Chip!')}
      >
        {display}
      </Chip> */}
    </Box>
  );
}