import React, { useContext } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import InformationModal from '@/components/modals/Information.modal';
import DiamondModal from '@/components/modals/Diamond.modal';
import BuiltInFooterSideMenu from '../components/BuiltInSideMenu';
import { SettingFooterContext } from '../context/SettingFooter.context';
import BuiltInFooterDisplay from '../components/BuiltInFooterDisplay';

const SelectFooterModal = ({ isOpened, onClose, onSelect }) => {
  const { builtInData } = useContext(SettingFooterContext)

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
      title={"Select Footer"}
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
      SidemenuComponent={<BuiltInFooterSideMenu
        builtInSites={builtInData}

      // primaryText={"primary"}
      // secondaryText={"secondary"}

      />}
      DisplayComponent={<BuiltInFooterDisplay
        onSelect={handleSelect}
      />}
    >

    </DiamondModal>
  );
};

export default SelectFooterModal;
