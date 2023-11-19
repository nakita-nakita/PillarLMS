import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTheme } from '@mui/material';

const SelectionHeader = ({ header, subheader, onLeftButtonClick, onRightButtonClick }) => {
  const theme = useTheme()
  return (
    <div className='p-2'
    style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: theme.palette.night.main,
      color: theme.palette.getContrastText(theme.palette.night.dark),
      borderBottom: `1px solid ${theme.palette.grey[400]}`
    }}>
      <Grid container spacing={2} alignItems="center">
        {/* Left Button with Chevron Left Icon */}
        <Grid item  xs={1}>
          <Typography sx={{ pt: 3 }}>
          </Typography>
          <IconButton
            onClick={onLeftButtonClick}
            sx={{
              border: `3px solid ${theme.palette.grey[200]}`
            }}
          >
            <ChevronLeftIcon sx={{color: theme.palette.grey[200]}} />
          </IconButton>
        </Grid>

        {/* Header and Subheader in the Center */}
        <Grid item xs={10} container direction="column" alignItems="center">
          <Typography variant="h5" sx={{ pt: 3 }}>
            {header || "Simple Buttons"}
          </Typography>
          <Typography variant="subtitle1" sx={{ pb: 1 }}>
            {subheader || "John Doe"}
          </Typography>
        </Grid>

        {/* Right Button with Chevron Right Icon */}
        <Grid item  xs={1}>
          <Typography sx={{ pt: 3 }}>
          </Typography>
          <IconButton
            onClick={onRightButtonClick}
            sx={{
              border: `3px solid ${theme.palette.grey[200]}`
            }}
          >
            <ChevronRightIcon sx={{color: theme.palette.grey[200]}} />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default SelectionHeader;
