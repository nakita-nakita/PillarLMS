import React from 'react';
import DiamondModal from '@/components/modals/Diamond.modal';
import MediaManagerModalView from './MediaManager/components/MediaManagerModalView';


const SelectMediaModal = ({ open, onClose, onSelect }) => {


  return (
    <DiamondModal
      isOpened={open}
      onClose={onClose}
      title={"Select Media"}
      tabs={[
        {
          label: "Media Manager",
          value: "MEDIA_MANAGER",
        },
      ]}
      selectedTabValue={"MEDIA_MANAGER"}
      isFullDisplay
      FullDisplay={(<MediaManagerModalView onClose={onClose} onSelect={onSelect} />)}
    >
    </DiamondModal>
  );
};

export default SelectMediaModal;
