import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns = [
  {
    field: 'firstName',
    headerName: 'First name',
    width: 200,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 200,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 210,
    editable: true,
  },
  {
    field: 'username',
    headerName: 'Username',
    // description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    // valueGetter: (params) =>
    //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'role',
    headerName: 'Role',
    // description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    // valueGetter: (params) =>
    //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  {
    field: 'status',
    headerName: 'Status',
    // description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    // valueGetter: (params) =>
    //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', email: "fakeemail@email.com", username: "blah blah blah", role: "Admin", status: "banned" },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', email: "fakeemail@email.com", username: "blah blah blah", role: "Content Creator", status: "active", },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', email: "fakeemail@email.com", username: "blah blah blah", role: "Editor", status: "unvertified", },
  { id: 4, lastName: 'Stark', firstName: 'Arya', email: "fakeemail@email.com", username: "blah blah blah", role: "Admin", status: "active", },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', email: "fakeemail@email.com", username: "blah blah blah", role: "Admin", status: "active", },
  { id: 6, lastName: 'Melisandre', firstName: null, email: "fakeemail@email.com", username: "blah blah blah", role: "Editor", status: "active", },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', email: "fakeemail@email.com", username: "blah blah blah", role: "Editor", status: "active", },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', email: "fakeemail@email.com", username: "blah blah blah", role: "Editor", status: "active", },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', email: "fakeemail@email.com", username: "blah blah blah", role: "Editor", status: "active", },
];

export default function UserManagementDataGrid() {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
      // checkboxSelection
      // disableRowSelectionOnClick
      />
    </Box>
  );
}