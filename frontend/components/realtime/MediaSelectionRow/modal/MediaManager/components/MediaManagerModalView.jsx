import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import MediaFolderView from './MediaFolderView';
import { SelectMediaManagerContext } from '../context/selectMediaManager.context';

const MediaManagerModalView = ({ onSelect, onClose }) => {
  const {
    mediaManager, setMediaManager,
    selectedImage, setSelectedImage,
    selectImage,
    selectFolder,
  } = useContext(SelectMediaManagerContext)

  const handleSelect = (event) => {
    if (onSelect) {
      onSelect(selectedImage);
    }

    if (onClose) {
      onClose(event)
    }
  };

  return (
    <Grid container spacing={2}>
      {/* First Column (50%) */}
      <Grid item xs={6}>
        {/* Your content for the first column goes here */}
        <div style={{ backgroundColor: '#f0f0f0', height: '100%' }}>
          {/* Media Manager Content */}
          <MediaFolderView />
        </div>
      </Grid>

      {/* Second Column (50%) */}
      <Grid item xs={6} style={{ position: 'relative', paddingLeft: 0 }}>

        {/* Right column with Paper and Select button */}
        <div style={{ position: 'absolute', bottom: '0', right: "0", left: "0" }}>
          <Paper style={{ padding: '16px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', borderRadius: 0 }}>
            <Button variant="contained" color="primary" onClick={handleSelect} disabled={!selectedImage}>
              Select
            </Button>
          </Paper>
        </div>

        {/* Gray background for image preview */}
        <div style={{ backgroundColor: '#e0e0e0', height: '100%', padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/* Image preview content */}
          {selectedImage?.url !== undefined && (
            <img
              src={`${process.env.NEXT_PUBLIC_WEB_API_URL}${selectedImage.url}`}
              style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
              alt="Preview"
            />
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default MediaManagerModalView;
