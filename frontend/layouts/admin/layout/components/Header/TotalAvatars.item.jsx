import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import PropTypes from 'prop-types';
import AdminLayoutContext from '../../adminLayout.context';
import UserAvatar from '@/components/chip/user.avatar';

export default function TotalAvatars({ max, ...props }) {
  const {whoIsOnPage} = React.useContext(AdminLayoutContext)
  
  return (
    <div {...props}>
      <AvatarGroup max={max}> 
      {/* //total={total} */}
        {whoIsOnPage?.list && whoIsOnPage.list.length > 0 && whoIsOnPage.list.map(user => (
          <UserAvatar {...user} />
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