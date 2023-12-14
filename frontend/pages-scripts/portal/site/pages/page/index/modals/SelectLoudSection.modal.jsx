import React, { useContext } from 'react';
import DiamondModal from '@/components/modals/Diamond.modal';
import BuiltInLoudSectionSideMenu from './loudComponents/builtIn/BuiltInLoudSectionSideMenu';
import BuiltInDisplay from './loudComponents/builtIn/BuiltInDisplay';
import { SiteDesignerPageContext } from '../context/SiteDesignerPage.context';

const SelectLoudSectionModal = ({ isOpened, onClose, onSelect }) => {

  const {
    loudSectionBuiltIn,
  } = useContext(SiteDesignerPageContext)


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
      title={"Select Loud Section"}
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
      SidemenuComponent={<BuiltInLoudSectionSideMenu
        builtInSites={loudSectionBuiltIn}

      // primaryText={"primary"}
      // secondaryText={"secondary"}

      />}
      DisplayComponent={<BuiltInDisplay
        onSelect={handleSelect}
      />}
    >

    </DiamondModal>
  );
};

export default SelectLoudSectionModal;
