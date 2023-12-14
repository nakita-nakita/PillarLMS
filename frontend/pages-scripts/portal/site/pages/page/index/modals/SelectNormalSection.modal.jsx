import React, { useContext } from 'react';
import DiamondModal from '@/components/modals/Diamond.modal';
import BuiltInNormalSectionSideMenu from './normalComponents/builtIn/BuiltInNormalSectionSideMenu';
import BuiltInDisplay from './normalComponents/builtIn/BuiltInDisplay';
import { SiteDesignerPageContext } from '../context/SiteDesignerPage.context';

const SelectNormalSectionModal = ({ isOpened, onClose, onSelect }) => {

  const {
    normalSectionBuiltIn,
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
      title={"Select Normal Section"}
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
      SidemenuComponent={<BuiltInNormalSectionSideMenu
        builtInSites={normalSectionBuiltIn}

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

export default SelectNormalSectionModal;
