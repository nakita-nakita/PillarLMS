import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, ListItemIcon, Typography, ListItem } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PinterestIcon from '@mui/icons-material/Pinterest';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import RedditIcon from '@mui/icons-material/Reddit';

export default function RealTimeSocialMediaRow() {
  const [selectedMedia, setSelectedMedia] = useState('');

  const handleChange = (event) => {
    setSelectedMedia(event.target.value);
  };

  return (
    <ListItem>
      <FormControl variant="outlined" fullWidth>
        <InputLabel>Social Media</InputLabel>
        <Select
          value={selectedMedia}
          onChange={handleChange}
          label="Social Media"
        >
          <MenuItem value="facebook">
            <ListItemIcon>
              <FacebookIcon />
            </ListItemIcon>
            <Typography variant="inherit">Facebook</Typography>
          </MenuItem>
          <MenuItem value="twitter">
            <ListItemIcon>
              <TwitterIcon />
            </ListItemIcon>
            <Typography variant="inherit">Twitter</Typography>
          </MenuItem>
          <MenuItem value="instagram">
            <ListItemIcon>
              <InstagramIcon />
            </ListItemIcon>
            <Typography variant="inherit">Instagram</Typography>
          </MenuItem>
          <MenuItem value="linkedin">
            <ListItemIcon>
              <LinkedInIcon />
            </ListItemIcon>
            <Typography variant="inherit">LinkedIn</Typography>
          </MenuItem>
          <MenuItem value="youtube">
            <ListItemIcon>
              <YouTubeIcon />
            </ListItemIcon>
            <Typography variant="inherit">YouTube</Typography>
          </MenuItem>
          <MenuItem value="pinterest">
            <ListItemIcon>
              <PinterestIcon />
            </ListItemIcon>
            <Typography variant="inherit">Pinterest</Typography>
          </MenuItem>
          <MenuItem value="whatsapp">
            <ListItemIcon>
              <WhatsAppIcon />
            </ListItemIcon>
            <Typography variant="inherit">WhatsApp</Typography>
          </MenuItem>
          <MenuItem value="reddit">
            <ListItemIcon>
              <RedditIcon />
            </ListItemIcon>
            <Typography variant="inherit">Reddit</Typography>
          </MenuItem>
          
          {/* ... Add more social media options as needed */}
        </Select>
      </FormControl>
    </ListItem>
  );
}
