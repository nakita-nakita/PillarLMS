'use client'

// library
import React, { useState } from 'react'

// Mine
// import AdminLayoutContext from '../../../layout/adminLayout.context';
// import * as tabsJson from '../../tabs.json';
// import * as settingsTabsJson from '../tabs.json';
// import SettingTabs from '../tabs';
// import SettingTabsContext from '../setting-tabs.context';
// import PageTemplatesDataGrid from '@/pages-scripts/vc/site/page-templates/data.grid';
import tabsJson from '@/pages-scripts/vc/admin/tabs.json';
import settingsTabsJson from '@/pages-scripts/vc/admin/settings/tabs.json';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import AdminLayout from '@/layouts/admin/layout';
import SettingTabs from '@/pages-scripts/vc/admin/settings/tabs';
import SettingTabsContext from '@/pages-scripts/vc/admin/settings/setting-tabs.context';

// MUI
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const boxStyles = {
  width: "120px",
  height: "120px",
  mr: "5px",
}


const Page = () => {
  const theme = useTheme()

  const nightModeStyles = {
    backgroundColor: theme.palette.grey['800'],
    color: theme.palette.grey[200],
    height: "100px",
    padding: "15px",
  }

  const lightModeStyles = {
    backgroundColor: theme.palette.grey['200'],
    color: theme.palette.grey[800],
    height: "100px",
    padding: "15px",
  }
  const { setTabs } = React.useContext(AdminLayoutContext)
  const settingsTabsContext = React.useContext(SettingTabsContext)

  const [isLoaded, setIsLoaded] = useState(false)

  const [color1, setColor1] = useState("")
  const [color2, setColor2] = useState("")
  const [color3, setColor3] = useState("")
  const [color4, setColor4] = useState("")
  const [color5, setColor5] = useState("")


  React.useEffect(() => {
    setTabs(prevState => ({
      ...prevState,
      tabs: tabsJson.tabs,
      selectedValue: 1,
    }))

    settingsTabsContext.setTabs(prevState => ({
      ...prevState,
      tabs: settingsTabsJson.tabs,
      selectedValue: 1,
    }))

  }, [])

  return (

    <Box sx={{
      flexGrow: 1,
      width: "100%",
      maxWidth: "900px",
      m: "auto"
    }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <SettingTabs />
      </Box>
      <br />
      <h2>Color Palette</h2>
      <Paper elevation={3} className='admin-card'>
        <p>You shouldn't change after established</p>
        <br />
        <Button variant='contained'>Select</Button>
        <br />
        <br />
        <Grid container spacing={2}>
          <Grid xs={2} sx={{ ...boxStyles, background: "#003049" }}>
          </Grid>
          <Grid xs={2} sx={{ ...boxStyles, background: "#d62828" }}>
          </Grid>
          <Grid xs={2} sx={{ ...boxStyles, background: "#f77f00" }}>
          </Grid>
          <Grid xs={2} sx={{ ...boxStyles, background: "#fcbf49" }}>
          </Grid>
          <Grid xs={2} sx={{ ...boxStyles, background: "#eae2b7" }}>
          </Grid>
        </Grid>
      </Paper>
      {/* <br />
      <h2>Text on paper</h2>
      <Paper elevation={3} sx={{ padding: "33px" }}>
        <Grid container spacing={2}>
          <Grid xs={6}>
            <p>
              Light Mode Text
            </p>
            <br />
            <Button variant='contained'>Select</Button>
            <br />
            <br />
            <div style={lightModeStyles}>Example Text</div>
          </Grid>
          <Grid xs={6}>
            <p>
              Night Mode Text
            </p>
            <br />
            <Button variant='contained'>Select</Button>
            <br />
            <br />
            <div style={nightModeStyles}>Example Text</div>
          </Grid>
        </Grid>


      </Paper> */}

      <br />
      <Button variant="contained" color="secondary">Save</Button>
    </Box>
  )
}

Page.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}

export default Page