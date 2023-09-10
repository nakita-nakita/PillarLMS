'use client'

import * as React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 350,
      editable: true,
      renderCell: (params) => (
        <div>
          <Link href={`/builder/page-templates/${params.row.id}`}>
            {params.row.name}
          </Link>
        </div>
      )
    },
    {
      field: 'mainMenuPageCount',
      headerName: 'Main Menu Page Count',
      width: 165,
      editable: true,
    //   type: number
    },
    {
      field: 'footerPageCount',
      headerName: 'Footer Page Count',
      width: 145,
      editable: true,
    //   type: number
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      editable: true,
    },
  ];
  
  const rows = [
    { id: 1,footerPageCount:10, mainMenuPageCount: 20,  name: 'Snow', status: 'Draft' },
    { id: 2,footerPageCount:10, mainMenuPageCount: 20,  name: 'Lannister', status: '1st Published' },
    { id: 3,footerPageCount:10, mainMenuPageCount: 20,  name: 'Lannister', status: 'Republish "NO" Change' },
    { id: 4,footerPageCount:10, mainMenuPageCount: 20,  name: 'Stark', status: 'Republish "YES" Change' },
  ];
  
export default function PageTemplatesDataGrid() {
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