import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import PropTypes from 'prop-types';

export default function TotalAvatars({ total, max, listOfIcons, ...props }) {
  return (
    <div {...props}>
      <AvatarGroup total={total} max={max}>
        {listOfIcons && listOfIcons.length > 0 && listOfIcons.map(icon => (
          <Avatar alt={icon.alt} src={icon.src} />
        ))}
      </AvatarGroup>
    </div>
  );
}

TotalAvatars.propTypes = {
  total: PropTypes.string.isRequired,
  max: PropTypes.string.isRequired,
  listOfIcons: PropTypes.arrayOf(PropTypes.shape({
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  })).isRequired,
}