import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, IconButton, useTheme } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PinterestIcon from '@mui/icons-material/Pinterest';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import RedditIcon from '@mui/icons-material/Reddit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function SocialMediaList() {
  const theme = useTheme()
  const socialMediaItems = [
    { icon: <FacebookIcon />, name: 'Facebook' },
    { icon: <TwitterIcon />, name: 'Twitter' },
    { icon: <InstagramIcon />, name: 'Instagram' },
    { icon: <LinkedInIcon />, name: 'LinkedIn' },
    { icon: <YouTubeIcon />, name: 'YouTube' },
    { icon: <PinterestIcon />, name: 'Pinterest' },
    { icon: <WhatsAppIcon />, name: 'WhatsApp' },
    { icon: <RedditIcon />, name: 'Reddit' }
  ];

  const rowStyles= {
    hover: 'pointer',
    "&:hover": {
      backgroundColor: theme.palette.grey[300],
    }
  }

  return (
    <List>
      {socialMediaItems.map((media, index) => (
        <ListItem button key={index} sx={index % 2 === 0 ? { backgroundColor: theme.palette.grey[200], ...rowStyles } : rowStyles}>
          <ListItemIcon>{media.icon}</ListItemIcon>
          <ListItemText primary={media.name} />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon color="error" />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}
