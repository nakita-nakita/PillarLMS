import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import PropTypes from 'prop-types';
import AdminLayoutContext from '../../adminLayout.context';
import UserAvatar from '@/components/chip/user.avatar';

export default function TotalAvatars({ ...props }) {
  const { whoIsOnPage, setWhoIsOnPage } = React.useContext(AdminLayoutContext)

  const onOpen = (event) => {
    setWhoIsOnPage(prevState => ({
      ...prevState,
      modal_isEveryoneOnPageModalOpened: true
    }))
  }

  return (
    <div {...props}>
      <AvatarGroup max={5} total={whoIsOnPage.total} onClick={onOpen}>
        {whoIsOnPage?.list && whoIsOnPage.list.length > 0 && whoIsOnPage.list.map(user => (
          <UserAvatar
            key={user.id}
            callByType={user.callByType}
            circleColor={user.circleColor}
            email={user.email}
            firstName={user.firstName}
            labelColor={user.labelColor}
            lastName={user.lastName}
            picture={user.picture}
            username={user.username}
          />
        ))}
      </AvatarGroup>
    </div>
  );
}
