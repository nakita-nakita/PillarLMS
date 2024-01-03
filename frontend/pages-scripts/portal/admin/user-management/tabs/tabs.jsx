// library
import React, { useContext } from 'react'

// mine
import UserManagementTabsContext from './UserManagementTabs.context'
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';

// MUI
import { useTheme } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from '@mui/material/Link';

const UserManagementTabs = () => {
  const theme = useTheme()

  const { tabs } = useContext(UserManagementTabsContext)
  const { navigate} = React.useContext(AdminLayoutContext)

  return (
    <>
      <Tabs value={tabs.selectedValue} aria-label="basic tabs example" sx={{ backgroundColor: theme.palette.grey[700], m:0 }} TabIndicatorProps={{ sx: { backgroundColor: theme.palette.common.white } }}>
        {tabs && tabs.tabs && tabs.tabs.map((tab, i) => (
          <Link onClick={() => navigate(tab.link)}>
            <Tab value={i} label={tab.name} sx={{
              background: theme.palette.grey[700],
              color: theme.palette.common.white,
              "&:hover": {
                background: theme.palette.grey[600],
              }
            }} />
          </Link>
        ))}
      </Tabs>
    </>
  )
}

export default UserManagementTabs