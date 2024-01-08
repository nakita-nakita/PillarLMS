import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVert from '@mui/icons-material/MoreVert';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { useRouter } from 'next/navigation';

export default function NewPagesDeletedDataGrid() {

  const {
    //status circles
    CircleStatusSuccess,
    CircleStatusDanger,
    //links
    navigate,
  } = React.useContext(AdminLayoutContext)

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const handleClick = (event, id) => {
    setSelectedId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    setAnchorEl(null);
  };

  const columns = [
    {
      field: 'slug',
      headerName: 'Slug',
      width: 350,
      renderCell: (params) => {

        return (
          <>
            <p onClick={() => navigate(`/portal/dashboard/new-pages/deleted/${params.row.id}`)}
              style={{
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              {params.row.slug}
            </p>
            {/* navigate(`/portal/site/pages/${params.id}`); */}
          </>
        )
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 130,
      sortable: false,
      renderCell: (params) => (
        <div>
          <IconButton
            size="small"
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={(e) => handleClick(e, params.row.id)}
          >
            <MoreVert />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={selectedId === params.row.id && Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>View Page</MenuItem>
            {/* Add more actions if required */}
          </Menu>
        </div>
      ),
    },
  ];

  const [rows, setRows] = useState([
    {
      slug: "/p/awesome-page",
      id: 42,
      isReady: true
    },
    {
      slug: "/api/v1/cms/p/awesome-cms-page",
      id: 43,
      isReady: false
    },
  ])

  // useEffect(() => {
  //   getPagesGraphQL({}).then(response => {
  //     const data = response.data.backendSiteDesignerPage_getManyWithPagination || { rows: [] }

  //     setRows(data.rows)


  //   })
  // }, [])

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={25}
        getRowClassName={(params, rowIndex) =>
          rowIndex % 2 === 0 ? 'even-row' : 'odd-row'
        }
        rowHover
        disableColumnFilter // Disable column filters
        disableColumnMenu   // Disable column menu (sorting options)
        disableSelectionOnClick // Disable row selection click feedback

      // onRowClick={(params) => {
      //   navigate(`/portal/site/pages/${params.id}`);
      // }}
      />
    </div>
  );
}
