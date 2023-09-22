// libraries
import React from 'react'
import PropTypes from 'prop-types';

// mine
import InformationModal from '@/components/modals/Information.modal';
import AdminLayoutContext from '../../adminLayout.context';
import UserChip from '@/components/chip/user.chip';

//mui
import Stack from '@mui/material/Stack';


function EveryoneOnPageModal({ isOpened, onClose, listOfIcons, total }) {

  const { whoIsOnPage } = React.useContext(AdminLayoutContext)

  console.log('whoIsOnPage', whoIsOnPage)

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

EveryoneOnPageModal.propTypes = {
  total: PropTypes.string.isRequired,
  isOpened: PropTypes.boolean,
  onClose: PropTypes.func,
  listOfIcons: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    status: PropTypes.string,
  })).isRequired,
}

export default EveryoneOnPageModal
