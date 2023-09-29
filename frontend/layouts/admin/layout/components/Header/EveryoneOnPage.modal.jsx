// libraries
import React from 'react'
import PropTypes from 'prop-types';

// mine
import InformationModal from '@/components/modals/Information.modal';
import AdminLayoutContext from '../../adminLayout.context';
import UserChip from '@/components/chip/user.chip';

//mui
import Stack from '@mui/material/Stack';


function EveryoneOnPageModal({ isOpened, onClose }) {
  const { whoIsOnPage } = React.useContext(AdminLayoutContext)

  return (
    <InformationModal
      isOpened={isOpened}
      onClose={onClose}
      disableSubmit
      header="Who is on the page"
    >
      <h3 style={{ paddingBottom: "5px", paddingTop: "5px" }}>Total: {whoIsOnPage.total}</h3>

      <Stack direction="row" spacing={1}>
        {/* <AlignItemsList listOfIcons={listOfIcons} /> */}
        {whoIsOnPage.list && whoIsOnPage.list.map(user => (
          <UserChip
            key={user.id}
            email={user.email}
            firstName={user.firstName}
            lastName={user.lastName}
            username={user.username}
            callByType={user.callByType}
            picturePreview={user.picture}
            labelColor={user.labelColor}
            circleColor={user.circleColor}
          />
        ))}
      </Stack>
    </InformationModal>
  )
}

// EveryoneOnPageModal.propTypes = {
//   isOpened: PropTypes.boolean,
//   onClose: PropTypes.func,
// }

export default EveryoneOnPageModal
