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
    <Grid container spacing={2} alignItems="center">
      {/* Left Button with Chevron Left Icon */}
      <Grid item>
        <IconButton
          onClick={onLeftButtonClick}
          sx={{
            border: `1px solid ${theme.palette.grey[900]}`
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
      </Grid>

      {/* Header and Subheader in the Center */}
      <Grid item xs={10} container direction="column" alignItems="center">
        <Typography variant="h5" sx={{pt: 1}}>
          {header || "Simple Buttons"}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" sx={{pb: 1}}>
          {subheader || "John Doe"}
        </Typography>
      </Grid>

      {/* Right Button with Chevron Right Icon */}
      <Grid item>
        <IconButton
          onClick={onRightButtonClick}
          sx={{
            border: `1px solid ${theme.palette.grey[900]}`
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default SelectionHeader;
