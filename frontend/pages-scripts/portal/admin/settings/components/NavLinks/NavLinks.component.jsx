'use-client'

import React, { useContext, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography, IconButton, Menu, MenuItem, ListItem } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { MoreVert, DragIndicator, Edit, Delete } from '@mui/icons-material';
import { useTheme } from '@mui/system';
import { LinksContext } from './LinkContext';


function NavLinks({ id }) {

  const { globalLinks, setGlobalLinks } = useContext(LinksContext);
    
  const dropdown = globalLinks.find(d => d.id === id);

  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Droppable droppableId={id} type="LINKS">
        {(provided) => (
          <Box {...provided.droppableProps} ref={provided.innerRef}>
            <Table size="small">
              <TableHead>
                <TableRow style={{ backgroundColor: theme.palette.primary.light }}>
                  <TableCell>Drag</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Link/Page Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dropdown.menus.map((link, index) => (
                  <Draggable key={link.id} draggableId={link.id} index={index}>
                    {(provided) => (
                      <TableRow ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <TableCell>
                          <IconButton size="small">
                            <DragIndicator />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          <Typography>{link.label}</Typography>
                          {/* {link.label} */}
                        </TableCell>
                        <TableCell>
                          <Typography>{link.href}</Typography>
                          {/* {link.href} */}
                        </TableCell>
                        <TableCell>
                          <IconButton size="small" onClick={handleMenuClick}>
                            <MoreVert />
                          </IconButton>
                          <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                          >
                            <MenuItem onClick={handleMenuClose}>
                              <Edit fontSize="small" />
                              &nbsp; Edit
                            </MenuItem>
                            <MenuItem onClick={handleMenuClose}>
                              <Delete fontSize="small" />
                              &nbsp; Delete
                            </MenuItem>
                          </Menu>
                        </TableCell>
                      </TableRow>
                    )}
                  </Draggable>
                ))}
              </TableBody>
            </Table>
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </div>
  );
}

export default NavLinks;
