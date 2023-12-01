import React, { useContext } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import InformationModal from '@/components/modals/Information.modal';
import DiamondModal from '@/components/modals/Diamond.modal';
import BuiltInFooterSideMenu from '../components/BuiltInSideMenu';
import { SettingFooterContext } from '../context/SettingFooter.context';
import BuiltInFooterDisplay from '../components/BuiltInFooterDisplay';

const SelectFooterModal = ({ isOpened, onClose, onSelect }) => {
  const { builtInData } = useContext(SettingFooterContext)

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
      modalFooter={"Select Footer"}
      //   isOpened={open}
      //   onClose={onClose}
      //   header="Select Color Palette."
      //   disableSubmit
      builtInSidemenuComponent={<BuiltInFooterSideMenu
        builtInSites={builtInData}

      // primaryText={"primary"}
      // secondaryText={"secondary"}

      />}
      builtInDisplayComponent={<BuiltInFooterDisplay
      />}
    >

    </DiamondModal>
  );
};

export default SelectFooterModal;
