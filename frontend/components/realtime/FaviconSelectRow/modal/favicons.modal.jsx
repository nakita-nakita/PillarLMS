import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import InformationModal from '@/components/modals/Information.modal';

// Sample color palettes data
const favicons = [
  {
    link: "/resources/favicons/test.ico",
  },
];

const SettingFaviconModal = ({ open, onClose, onSelect }) => {


  const handleSelect = (favicon) => {
    if (onSelect) {
      onSelect(favicon)
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
        {favicons.map((fav, index) => (
          <Button key={index} onClick={() => handleSelect(fav)} sx={{ mb: 2 }}>
            <div>
              <img
                alt={`favicon-${index + 1}`}
                src={`${process.env.NEXT_PUBLIC_WEB_API_URL}${fav.link}`}
                style={{ width: "16px", height: "16px" }}
              />
            </div>
          </Button>
        ))}
      </Box>
    </InformationModal>
  );
};

export default SettingFaviconModal;
