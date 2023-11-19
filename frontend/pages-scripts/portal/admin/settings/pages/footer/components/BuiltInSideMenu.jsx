import React, { useState } from 'react';
import RenderSiteSideMenuSelection from './RenderSiteSideMenuSelection';
// import RenderSiteSideMenuSelection from './RenderSiteSideMenuSelection';

const BuiltInSideMenu = ({ builtInSites, onComponentSelect }) => {

  console.log('builtInSites', builtInSites);

  const [open, setOpen] = useState(false);
  const [selectedComponents, setSelectedComponents] = useState([]);


  return (
    <div>
      {builtInSites && builtInSites.map(site => <RenderSiteSideMenuSelection
        site={site}
        onComponentSelect={(selection) => {
          console.log('site: selection', selection)

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
