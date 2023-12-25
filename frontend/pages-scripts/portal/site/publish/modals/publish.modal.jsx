// libraries
import React, { useContext } from 'react'

// mine
import InformationModal from '@/components/modals/Information.modal';
import { SiteDesignerPublishContext } from '../context/SiteDesignerPublish.context';


function PublishModal({ isOpened, onClose, onSubmit }) {
  const {       
    isLoaded,setIsLoaded,
    isNewPublishModalOpen, setIsNewPublishModalOpen,
    publishRecords, setPublishRecords,
    openPublishModal,
    publishWebsite,
   } = useContext(SiteDesignerPublishContext)

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit()
    }

    if (onClose) {
      onClose()
    }
  }

  return (
    <InformationModal
      isOpened={isOpened}
      onClose={onClose}
      header="Publish Site."
      onSubmit={handleSubmit}
      submitLabel={"Publish Site"}
    >
      <p>Will you like to publish.</p>
      
    </InformationModal>
  )
}

// MeetingChangeNameModal.propTypes = {
//   isOpened: PropTypes.boolean,
//   onClose: PropTypes.func,
// }

export default PublishModal
