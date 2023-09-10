import React, { useState, useEffect } from 'react';

// mui
import { useTheme } from '@mui/material/styles';
// import Avatar from '@mui/joy/Avatar';
import Box from '@mui/material/Box';
// import Chip from '@mui/joy/Chip';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function PreviewChip({ email, firstName, lastName, username, callByType, picturePreview, labelColor, circleColor }) {
  const theme = useTheme()
  const defaultColor = "#f1f4f5"

  const [display, setDisplay] = useState('')

  console.log('blah', { email, firstName, lastName, username, callByType, picturePreview, labelColor, circleColor })

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
    }
  }, [email, firstName, lastName, username, callByType])


  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      {/* <Chip avatar={<Avatar>M</Avatar>} label="Avatar" /> */}
      <Chip
        avatar={<Avatar alt="Natacha" src="/static/images/avatar/1.jpg" />}
        label="Avatar"
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