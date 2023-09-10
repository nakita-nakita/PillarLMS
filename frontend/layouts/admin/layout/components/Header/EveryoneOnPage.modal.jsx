import React from 'react'
// import AlignItemsList from '../../items/AlignListItem/AlignListItem.item'
// import InformationModal from '../../modals/Information.modal'
import PropTypes from 'prop-types';
import InformationModal from '@/components/modals/Information.modal';
import AlignItemsList from './AlignListItem.item';

function EveryoneOnPageModal({ isOpened, onClose, listOfIcons, total }) {


  return (
    <InformationModal
      isOpened={isOpened}
      onClose={onClose}
      disableSubmit
      header="Who is on the page"
    >
      <h3 style={{ marginLeft: "3rem" }}>Total: {total}</h3>
      <AlignItemsList listOfIcons={listOfIcons} />

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
