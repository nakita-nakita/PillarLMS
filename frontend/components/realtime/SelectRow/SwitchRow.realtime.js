import React, { useState, useEffect } from 'react';
import ListItem from '@mui/material/ListItem';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import UserChip from '@/components/chip/user.chip';

function RealTimeSelectRow({ id, label, values, onChange, selectedValue }) {
  const [selectValue, setSelectValue] = useState("");
  const [user, setUser] = useState();

  useEffect(() => {
    setSelectValue(selectedValue);
  }, [selectedValue]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <ListItem>
      <Box display="flex" flexDirection="column" alignItems="flex-start" width="100%">

        {/* Label Component */}
        <Typography variant="subtitle1" gutterBottom>
          {label}
        </Typography>

        {/* Select Component */}
        <Select
          value={selectValue}
          onChange={handleChange}
          style={{ width: '100%' }}
        >
          {values.map((option) => (
            <MenuItem key={option.key} value={option.key}>
              {option.value}
            </MenuItem>
          ))}
        </Select>

        {/* Chip Component */}
        {user && (
          <Box mt={1} display="flex" justifyContent="flex-end" width="100%">
            <Chip
              label={`${user.firstName} ${user.lastName}`}
              avatar={<img src={user.picture} alt="User Avatar" />}
            />
          </Box>
        )}

      </Box>
    </ListItem>
  );
}

export default RealTimeSelectRow;
