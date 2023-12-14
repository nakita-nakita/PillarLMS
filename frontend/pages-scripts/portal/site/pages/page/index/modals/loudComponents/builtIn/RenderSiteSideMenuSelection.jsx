import React, { useContext } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useTheme } from '@mui/material';
import { SiteDesignerPageContext } from '../../../context/SiteDesignerPage.context';

const RenderSiteSideMenuSelection = ({ site, onComponentSelect }) => {
  const theme = useTheme();

  const {
    loudSectionBuiltInSelected,
    selectLoudSectionComponent,
  } = useContext(SiteDesignerPageContext)

  const handleComponentSelect = (id) => {
    selectLoudSectionComponent({
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
        backgroundColor: loudSectionBuiltInSelected.id !== site.id ? theme.palette.grey[200] : theme.palette.primary.dark,
        color: loudSectionBuiltInSelected.id !== site.id ? theme.palette.grey[800] : theme.palette.primary.contrastText,
        "&:hover": {
          color: loudSectionBuiltInSelected.id !== site.id ? theme.palette.grey[800] : theme.palette.primary.contrastText,
          backgroundColor: loudSectionBuiltInSelected.id !== site.id ? theme.palette.grey[300] : theme.palette.primary.dark,
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
