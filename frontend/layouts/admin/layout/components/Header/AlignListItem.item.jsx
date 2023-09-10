import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

export default function AlignItemsList({ listOfIcons }) {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {listOfIcons.length > 0 && listOfIcons.map((user, i) => (
        <div key={user.id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={user.alt} src={user.src} />
            </ListItemAvatar>
            <ListItemText
              primary={(<strong>{user.alt}</strong>)}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Status:
                  </Typography>
                  {` — ${user.status}`}
                </React.Fragment>
              }
            />
          </ListItem>
          {i - 1 < listOfIcons.length && (
            <Divider variant="inset" component="li" />
          )}
        </div>

      ))}
    </List>
  );
}



AlignItemsList.propTypes = {
  listOfIcons: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    status: PropTypes.string,
  })).isRequired,
}
