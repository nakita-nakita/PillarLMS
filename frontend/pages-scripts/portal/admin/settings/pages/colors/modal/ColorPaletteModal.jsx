import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import InformationModal from '@/components/modals/Information.modal';

// Sample color palettes data
const colorPalettes = [
  { name: 'Palette 1', colors: ['#FF5733', '#33FF57', '#5733FF', '#FF33F6', '#FF8333', '#33FF83', '#8333FF'] },
  { name: 'Palette 2', colors: ['#FF5733', '#33FF57', '#5733FF', '#FF33F6', '#FF8333', '#33FF83', '#8333FF'] },
  // ... add 9 more palettes here
];

const ColorPaletteModal = ({ open, onClose, onSelectPalette }) => {


  const handlePaletteSelect = (palette) => {
    if (onSelectPalette) {
      onSelectPalette(palette)
    }

    if (onClose) {
      onClose()
    }
  }
  return (
    <InformationModal
      isOpened={open}
      onClose={onClose}
      header="Select Color Palette."
      disableSubmit
    >
      <Box p={3} bgcolor="white">
        {colorPalettes.map((palette, index) => (
          <Button key={index} onClick={() => handlePaletteSelect(palette)} sx={{ mb: 2 }}>
            <div>

              <Typography variant="h6">{palette.name}</Typography>
              <br />
              <Box display="flex">
                {palette.colors.map((color, idx) => (
                  <Box key={idx} bgcolor={color} width={30} height={30} mx={0.5}></Box>
                ))}
              </Box>
            </div>
          </Button>
        ))}
      </Box>
    </InformationModal>
  );
};

export default ColorPaletteModal;
