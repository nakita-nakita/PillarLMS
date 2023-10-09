import React, { useContext, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useTheme } from '@mui/system';
import dynamic from 'next/dynamic';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ExpandLess from '@mui/icons-material/ExpandLess';
import MoreVert from '@mui/icons-material/MoreVert';
import Delete from '@mui/icons-material/Delete';
import { Edit } from '@mui/icons-material';
import DragIndicator from '@mui/icons-material/DragIndicator';
import NavLinks from './NavLinks.component';
import { LinksContext } from './LinkContext';

// const DynamicNavLinks = dynamic(() => import('./NavLinks.component'), {
//   ssr: false,
// });


function NavLinksWrapper(props) {
  const { globalLinks, setGlobalLinks } = useContext(LinksContext);


  const [openItems, setOpenItems] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();

  // good for second list.
  // const onDragEnd = (result) => {
  //   const { source, destination } = result;
  //   console.log('source-d', source, destination)

  //   if (!destination) return;

  //   const sourceDropdown = globalLinks.find(d => d.id === source.droppableId);
  //   const destDropdown = globalLinks.find(d => d.id === destination.droppableId);

  //   const [movedItem] = sourceDropdown.menus.splice(source.index, 1);
  //   destDropdown.menus.splice(destination.index, 0, movedItem);

  //   // Now, set the updated links state
  //   setGlobalLinks([...globalLinks]);
  // };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === "droppable" && destination.droppableId === "droppable") {
        // If reordering within the wrapper (i.e., outer list)
        const reordered = Array.from(globalLinks);
        const [movedDropdown] = reordered.splice(source.index, 1);
        reordered.splice(destination.index, 0, movedDropdown);
        setGlobalLinks(reordered);
    } else {
        // If reordering menus inside the dropdowns (i.e., inner lists)
        const sourceDropdown = globalLinks.find(d => d.id === source.droppableId);
        const destDropdown = globalLinks.find(d => d.id === destination.droppableId);
        const [movedItem] = sourceDropdown.menus.splice(source.index, 1);
        destDropdown.menus.splice(destination.index, 0, movedItem);
        setGlobalLinks([...globalLinks]);
    }
};


  const handleToggle = (item) => {
    if (openItems.includes(item)) {
      setOpenItems((prevItems) => prevItems.filter((i) => i !== item));
    } else {
      setOpenItems((prevItems) => [...prevItems, item]);
    }
  };

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(dropProvided) => (
          <div {...dropProvided.droppableProps} ref={dropProvided.innerRef}>
            {globalLinks.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(dragProvided) => (
                  <div ref={dragProvided.innerRef} {...dragProvided.draggableProps}>
                    <ListItem
                      button
                      onClick={() => handleToggle(index)}
                      style={{ backgroundColor: theme.palette.grey[700], color: theme.palette.common.white }}
                    >
                      <IconButton size="small" {...dragProvided.dragHandleProps}>
                        <DragIndicator />
                      </IconButton>
                      <Typography variant="h6">{item.label}</Typography>
                      <IconButton edge="end" onClick={handleClick}>
                        <MoreVert />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={handleClose}>
                          <Edit fontSize="small" />
                          &nbsp; Edit
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <Delete fontSize="small" />
                          &nbsp; Delete
                        </MenuItem>
                      </Menu>
                      <ListItemSecondaryAction>
                        <IconButton edge="end" onClick={() => handleToggle(item)}>
                          {openItems.includes(item) ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    {openItems.includes(item) && <NavLinks id={item.id} {...props} />}
                  </div>
                )}
              </Draggable>
            ))}
            {dropProvided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default NavLinksWrapper;
