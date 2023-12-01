import React, { useState } from 'react';
import RenderSiteSideMenuSelection from './RenderSiteSideMenuSelection';
import HeaderRow from '@/components/global/HeaderRow/HeaderRow.component';
// import RenderSiteSideMenuSelection from './RenderSiteSideMenuSelection';

const BuiltInSideMenu = ({ builtInSites, onComponentSelect }) => {

  const [open, setOpen] = useState(false);
  const [selectedComponents, setSelectedComponents] = useState([]);


  return (
    <div>
      <HeaderRow label={"Headers"} />
      {builtInSites && builtInSites.map(site => <RenderSiteSideMenuSelection
        site={site}
        onComponentSelect={(selection) => {

          if (onComponentSelect) {
            onComponentSelect(selection)
          }
        }}
      />)}
      <br />
      <br />
      <br />

    </div>
  );
};

export default BuiltInSideMenu
