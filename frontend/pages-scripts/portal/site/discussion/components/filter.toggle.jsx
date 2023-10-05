import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useTheme } from '@mui/material';

export default function FilterToggle({ onChange }) {
  const theme = useTheme()
  const [alignment, setAlignment] = React.useState('NEW');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);

    if (onChange) {
      onChange(event, { type: newAlignment })
    }
  };

  const toggleTheme = {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  }

  return (
    <ToggleButtonGroup
      color="success"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton sx={{
        "&.MuiToggleButton-root.Mui-selected": toggleTheme,
      }}
        value="NEW"
      >
        Newest
      </ToggleButton>
      <ToggleButton
        sx={{
          "&.MuiToggleButton-root.Mui-selected": toggleTheme,
        }}
        value="TOP"
      >
        Top
      </ToggleButton>
    </ToggleButtonGroup>
  );
}