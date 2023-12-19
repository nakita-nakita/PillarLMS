import React, { useContext, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVert from '@mui/icons-material/MoreVert';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import FiberManualRecord from '@mui/icons-material/FiberManualRecord';
import DragIndicator from '@mui/icons-material/DragIndicator';
import { Link, useTheme } from '@mui/material';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { realtimeLink } from '@/utils/realtime/link';
import { useRouter } from 'next/router';

function PageList({ sections }) {
  const router = useRouter();
  const theme = useTheme();
  const { navigate } = useContext(AdminLayoutContext)


  const [pages, setPages] = useState(sections || []);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const reordered = Array.from(pages);
    const [movedPage] = reordered.splice(source.index, 1);
    reordered.splice(destination.index, 0, movedPage);

    setPages(reordered);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="pageList">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {pages.map((page, index) => (
              <Draggable key={page.id} draggableId={page.id} index={index}>
                {(draggableProvided) => (
                  <ListItem
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    style={{
                      ...draggableProvided.draggableProps.style,
                      borderBottom: '1px solid #e0e0e0'
                    }}
                  >
                    <IconButton {...draggableProvided.dragHandleProps}>
                      <DragIndicator />
                    </IconButton>
                    <Link
                      style={{
                        cursor: "pointer",
                        paddingLeft: "5px",
                      }}
                      onClick={() => navigate(`/portal/site/pages/${router.query.pageId}/section/${page.id}`)}
                    >
                      {page.name}
                      <br />
                      <small style={{
                        color: theme.palette.grey[800],
                        textDecoration: "none",
                      }}>
                        {page.author}

                      </small>
                    </Link>
                    <ListItemSecondaryAction>
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

                    </ListItemSecondaryAction>
                  </ListItem>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default PageList;


























// //
// //



// import React, { useState } from 'react';
// import { DndProvider, useDrag, useDrop } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import ListItem from '@mui/material/ListItem';
// import IconButton from '@mui/material/IconButton';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import MoreVert from '@mui/icons-material/MoreVert';
// import Edit from '@mui/icons-material/Edit';
// import Delete from '@mui/icons-material/Delete';
// import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
// import FiberManualRecord from '@mui/icons-material/FiberManualRecord';
// import DragIndicator from '@mui/icons-material/DragIndicator';
// import { Link } from '@mui/material';

// const ItemType = 'PAGE';

// const DraggableListItem = ({ page, index, moveItem }) => {
//   const ref = React.useRef(null);
//   const [anchorEl, setAnchorEl] = useState(null); // State for dropdown menu

//   // Functions for dropdown menu
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };


//   const [, drop] = useDrop({
//     accept: ItemType,
//     hover(item, monitor) {
//       if (!ref.current) {
//         return;
//       }

//       const dragIndex = item.index;
//       const hoverIndex = index;

//       if (dragIndex === hoverIndex) {
//         return;
//       }

//       moveItem(dragIndex, hoverIndex);

//       item.index = hoverIndex;
//     }
//   });

//   const [{ isDragging }, drag] = useDrag({
//     type: ItemType,
//     item: { id: page.id, index },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   drag(drop(ref));

//   return (

//     <ListItem ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
//       <IconButton>
//         <DragIndicator />
//       </IconButton>
//       <Link
//         style={{
//           cursor: "pointer",
//         }}
//       >
//         {page.label}
//       </Link>
//       <IconButton edge="end" onClick={handleClick}>
//         <MoreVert />
//       </IconButton>
//       <Menu
//         anchorEl={anchorEl}
//         keepMounted
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//       >
//         <MenuItem onClick={handleClose}>
//           <Edit fontSize="small" />
//           &nbsp; View
//         </MenuItem>
//         <MenuItem onClick={handleClose}>
//           <Edit fontSize="small" />
//           &nbsp; Edit
//         </MenuItem>
//         <MenuItem onClick={handleClose}>
//           <Delete fontSize="small" />
//           &nbsp; Delete
//         </MenuItem>
//       </Menu>
//       <ListItemSecondaryAction>
//         <FiberManualRecord style={{ color: page.isActive ? 'green' : 'red' }} />
//       </ListItemSecondaryAction>
//     </ListItem>
//   );
// };

// function PageList() {
//   const [pages, setPages] = useState([
//     { id: '1', label: 'Home', isActive: true },
//     { id: '2', label: 'About Us', isActive: false },
//     { id: '3', label: 'Services', isActive: true },
//     { id: '4', label: 'Contact', isActive: false },
//     { id: '5', label: 'Blog', isActive: true }
//   ]);


//   const movePage = (fromIndex, toIndex) => {
//     const updatedPages = [...pages];
//     const [movedPage] = updatedPages.splice(fromIndex, 1);
//     updatedPages.splice(toIndex, 0, movedPage);

//     setPages(updatedPages);
//   };

//   return (
//     <DndProvider backend={HTML5Backend}>
//       {pages.map((page, index) => (
//         <DraggableListItem key={page.id} index={index} page={page} moveItem={movePage} />
//       ))}
//     </DndProvider>
//   );
// }

// export default PageList;

