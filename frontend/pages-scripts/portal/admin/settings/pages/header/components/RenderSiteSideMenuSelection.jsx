import React, { useContext, useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Checkbox from '@mui/material/Checkbox';
import { useTheme } from '@mui/material';
import { SettingHeaderContext } from '../context/SettingHeader.context';

const RenderSiteSideMenuSelection = ({ site, onComponentSelect }) => {
  const theme = useTheme();
  
  const { selectComponent, builtInDataSelected } = useContext(SettingHeaderContext)
  
  console.log('site', site.id, builtInDataSelected)
  const [open, setOpen] = useState(true);
  const [selectedComponents, setSelectedComponents] = useState([]);

  const toggleCollapse = () => {
    setOpen(!open);
  };

  const handleComponentSelect = (id) => {

    selectComponent({
      id,
    })


  };

  return (
    <ListItem
      key={site.id}
      button
      onClick={() => handleComponentSelect(site.id)}
      className='hover:text-gray-800'
      sx={{
        backgroundColor: builtInDataSelected.id !== site.id ? theme.palette.grey[200] : theme.palette.primary.dark,
        color: builtInDataSelected.id !== site.id ? theme.palette.grey[800] : theme.palette.primary.contrastText,
        "&:hover": {
          color: builtInDataSelected.id !== site.id ? theme.palette.grey[800] : theme.palette.primary.contrastText,
          backgroundColor: builtInDataSelected.id !== site.id ? theme.palette.grey[300] : theme.palette.primary.dark,
        }
      }}
    >
      {/* <ListItemIcon>
          <Checkbox
            edge="start"
            checked={selectedComponents.includes(component.id)}
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon> */}
      <ListItemText primary={site.name} />
    </ListItem>
  );
};

export default RenderSiteSideMenuSelection
