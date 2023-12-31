import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVert from '@mui/icons-material/MoreVert';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { useRouter } from 'next/navigation';

export default function InvitedUserDataGrid() {
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
      field: 'email',
      headerName: 'Email',
      width: 300,
      renderCell: (params) => {

        return (
          <>
            <p onClick={() => navigate(`/portal/admin/user-management/invited-users/${params.row.id}`)}
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                color: "blue",
              }}
            >
              {params.row.email}
            </p>
            {/* navigate(`/portal/site/pages/${params.id}`); */}
          </>
        )
      }
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => {

        return (
          <>
            {params.row.status === "PENDING" && (
              <p>
                Invitation Pending
              </p>
            )}
            {params.row.status === "APPROVED" && (
              <p onClick={() => navigate(`/portal/admin/user-management/system-users/${params.row.id}`)}
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                User Approved
              </p>

            )}
            {params.row.status === "REJECTED" && (
              <p>
                User Declined
              </p>
            )}
            {params.row.status === "REVOKED" && (
              <p>
                Invitation Revoked
              </p>
            )}

          </>
        )
      }
    },
    {
      field: 'createdAt',
      headerName: 'Invite Date',
      width: 130,
      sortable: false,
      renderCell: (params) => (
        <div>
          MMM-DD-YYYY
        </div>
      ),
    },
  ];

  const [rows, setRows] = useState([
    {
      id: 42,
      email: "example@email.com",
      status: "PENDING",
    }
  ])

  useEffect(() => {
    // getPagesGraphQL({}).then(response => {
    //   const data = response.data.backendSiteDesignerPage_getManyWithPagination || { rows: [] }

    //   setRows(data.rows)


    // })
  }, [])

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
