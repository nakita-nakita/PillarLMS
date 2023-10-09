import React from 'react';
import { Card, CardContent, CardHeader, Typography, Button, Alert, Box } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

function DeletionWarningCard() {
  return (
    <Card elevation={3}>
      <CardHeader
        title="Delete Webpage"
        avatar={
          <WarningIcon fontSize="large" color="error" />
        }
      />
      <CardContent>
        <Alert severity="warning">
          Caution! Deleting a published page might not automatically remove it from search engine indexing.
        </Alert>
        <Typography variant="body1" color="error" gutterBottom style={{ marginTop: '16px' }}>
          If you proceed with deletion, you may need to handle the de-indexing from search engines separately. We currently do not provide a solution for automatic de-indexing.
        </Typography>
        <Box mt={2}>
          <Button variant="contained" color="secondary">
            Delete Page
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default DeletionWarningCard;
