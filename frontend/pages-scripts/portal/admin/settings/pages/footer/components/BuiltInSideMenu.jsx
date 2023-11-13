import React, { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Checkbox from '@mui/material/Checkbox';
import RenderSiteSideMenuSelection from './RenderSiteSideMenuSelection';

const BuiltInSideMenu = ({ builtInSites, onComponentSelect }) => {

  const [open, setOpen] = useState(false);
  const [selectedComponents, setSelectedComponents] = useState([]);

  const toggleCollapse = () => {
    setOpen(!open);
  };

  const handleComponentSelect = (componentId) => {
    const isSelected = selectedComponents.includes(componentId);

    if (isSelected) {
      setSelectedComponents(selectedComponents.filter((id) => id !== componentId));
    } else {
      setSelectedComponents([...selectedComponents, componentId]);
    }

    if (onComponentSelect) {
      onComponentSelect(componentId);
    }
  };

  return (
    <div>
        {builtInSites && builtInSites.map(site => <RenderSiteSideMenuSelection 
            site={site}
            onComponentSelect={(selection) => {
                console.log('site: selection', selection)
            }}
        />)}
        <br />
        <br />
        <br />
        
    </div>
  );
};

export default BuiltInSideMenu
