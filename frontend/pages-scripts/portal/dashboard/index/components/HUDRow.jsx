import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

const HUDRow = ({ isReady, newPages, changedPages, deletedPages }) => (
  <Box sx={{ marginBottom: 4, display: 'flex', justifyContent: 'space-between' }}>
    <div>
      <Typography variant="h6" gutterBottom>
        Is Ready
      </Typography>
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          backgroundColor: isReady ? 'green' : 'red',
        }}
      >
        <Typography variant="body2" color="textSecondary">
          {isReady ? 'Ready' : 'Not Ready'}
        </Typography>
      </Paper>
    </div>

    <div>
      <Typography variant="h6" gutterBottom>
        New Pages
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {newPages}
      </Typography>
    </div>

    <div>
      <Typography variant="h6" gutterBottom>
        Changed Pages
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {changedPages}
      </Typography>
    </div>

    <div>
      <Typography variant="h6" gutterBottom>
        Deleted Pages
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {deletedPages}
      </Typography>
    </div>
  </Box>
);

export default HUDRow;
