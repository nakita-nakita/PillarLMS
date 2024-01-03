import React from 'react';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import HeaderRow from '@/components/global/HeaderRow/HeaderRow.component';

const PermissionsTable = () => {
  const permissionsData = [
    { label: 'Dashboard', lists: [{ name: 'Read' }] },
    { label: 'Media Manager', lists: [{ name: 'incoming folder only' }, { name: 'read' }, { name: 'update' }, { name: 'delete' }] },
    { label: 'Website', lists: [{ name: 'read' }, { name: 'update' }, { name: 'delete' }] },
    { label: 'Admin (except user management)', lists: [{ name: 'read' }, { name: 'update' }, { name: 'delete' }] },
  ];

  return (
    <Paper elevation={3}>
      <List sx={{ p: 0 }}>
        <HeaderRow label="Permissions" />
      </List>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {permissionsData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell sx={{width: "200px"}}>{row.label}</TableCell>
                <TableCell>
                  <List>
                    {row.lists.map((listItem, listItemIndex) => (
                      <ListItem key={listItemIndex}>
                        <Checkbox />
                        {listItem.name}
                      </ListItem>
                    ))}
                  </List>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default PermissionsTable;
