import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVert from '@mui/icons-material/MoreVert';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { useRouter } from 'next/navigation';

export default function RoleDataGrid() {
  const router = useRouter()

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
      field: 'name',
      headerName: 'Name',
      width: 150,
      renderCell: (params) => {

        return (
          <>
            <p onClick={() => navigate(`/portal/admin/user-management/roles/${params.row.id}`)}
              style={{
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              {params.row.name}
            </p>
            {/* navigate(`/portal/site/pages/${params.id}`); */}
          </>
        )
      }
    },
  ];

  const [rows, setRows] = useState([
    {
      name: "test1",
      id: 42,
    }
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
