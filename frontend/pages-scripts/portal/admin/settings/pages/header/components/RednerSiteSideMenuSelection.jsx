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
    <div>
      <ListItem
        button
        onClick={toggleCollapse}
        sx={{
          backgroundColor: theme.palette.grey[600],
          color: theme.palette.grey[200],
          "&:hover": {
            backgroundColor: theme.palette.grey[800]
          }

        }}
      >
        <ListItemText primary={site.label} />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {site.category.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <ListItem
              sx={{
                background: theme.palette.grey[500],
                color: theme.palette.grey[200],

              }}
            >
              <ListItemText primary={category.label} />
            </ListItem>
            {category.components.map((component, componentIndex) => (
              <ListItem
                key={componentIndex}
                button
                onClick={() => handleComponentSelect(component.id)}
                sx={{
                  backgroundColor: builtInDataSelected.id !== component.id ? theme.palette.grey[200] : theme.palette.primary.dark,
                  color: builtInDataSelected.id !== component.id ? theme.palette.grey[800] : theme.palette.primary.contrastText,
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
                <ListItemText primary={component.name} />
              </ListItem>
            ))}
          </div>
        ))}
      </Collapse>
    </div>
  );
};

export default RenderSiteSideMenuSelection
