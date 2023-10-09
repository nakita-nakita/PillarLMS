import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

function PublishNoticeCard() {
  return (
    <Card elevation={3} sx={{ maxWidth: '400px', margin: '20px auto' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Important Notice
        </Typography>
        <Typography variant="body1" paragraph>
          Changes will be reflected on the website upon the next publish.
        </Typography>
        <Box textAlign="right">
          <Button variant="contained" color="primary">
            Go to Publish
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default PublishNoticeCard;
