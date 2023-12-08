import React, { useContext } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import InformationModal from '@/components/modals/Information.modal';
import DiamondModal from '@/components/modals/Diamond.modal';
import BuiltInHeaderSideMenu from '../components/BuiltInSideMenu';
import { SettingHeaderContext } from '../context/SettingHeader.context';
import BuiltInHeaderDisplay from '../components/BuiltInHeaderDisplay';

const SelectHeaderModal = ({ isOpened, onClose, onSelect }) => {
  const { builtInData } = useContext(SettingHeaderContext)

  const handleSelect = (info) => {
    if (onSelect) {
      onSelect(info)
    }

    if (onClose) {
      onClose()
    }
  }

  return (
    <DiamondModal
      isOpened={isOpened}
      onClose={onClose}
      title={"Select Header"}
      tabs={[
        {
          label: "Selected",
          value: "SELECTED",
        },
        {
          label: "Built-in",
          value: "BUILT_IN",
        },
        {
          label: "Market",
          value: "MARKET",
        },
        {
          label: "Agency",
          value: "AGENCY",
        },
        {
          label: "Favorites",
          value: "FAVORITES",
        },
        {
          label: "New",
          value: "NEW",
        },
      ]}
      selectedTabValue={"BUILT_IN"}
      //   isOpened={open}
      //   onClose={onClose}
      //   header="Select Color Palette."
      //   disableSubmit
      SidemenuComponent={<BuiltInHeaderSideMenu
        builtInSites={builtInData}

      // primaryText={"primary"}
      // secondaryText={"secondary"}

      />}
      DisplayComponent={<BuiltInHeaderDisplay
        onSelect={handleSelect}
      />}
    >

    </DiamondModal>
  );
};

export default SelectHeaderModal;
