import React, { useContext } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import InformationModal from '@/components/modals/Information.modal';
import DiamondModal from '@/components/modals/Diamond.modal';
import BuiltInHeaderSideMenu from '../components/BuiltInSideMenu';
import { SettingHeaderContext } from '../context/SettingHeader.context';
import BuiltInHeaderDisplay from '../components/BuiltInHeaderDisplay';

const SelectHeaderModal = ({ isOpened, onClose, onSelect }) => {
  const { builtInData } = useContext(SettingHeaderContext)

  const handleSelect = (favicon) => {
    if (onSelect) {
      onSelect(favicon)
    }

    if (onClose) {
      onClose()
    }
  }

  return (
    <DiamondModal
      isOpened={isOpened}
      onClose={onClose}
      modalHeader={"Select Header"}
      //   isOpened={open}
      //   onClose={onClose}
      //   header="Select Color Palette."
      //   disableSubmit
      builtInSidemenuComponent={<BuiltInHeaderSideMenu
        builtInSites={builtInData}

      // primaryText={"primary"}
      // secondaryText={"secondary"}

      />}
      builtInDisplayComponent={<BuiltInHeaderDisplay
      />}
    >

    </DiamondModal>
  );
};

export default SelectHeaderModal;
