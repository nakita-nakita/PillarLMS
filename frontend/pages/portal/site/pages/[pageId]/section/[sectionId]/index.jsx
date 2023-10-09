'use client'

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import Badge from '@mui/material/Badge';
import { useTheme } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';
// import PageDesignerLayoutContext from '../../pageDesignerLayout.context';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
// import PagePanelsDnd from '../components/PagePanelsDnD';
import TextField from '@mui/material/TextField';
import PageDesignerLayoutContext from '@/layouts/pageBuilderLayout/pageDesignerLayout.context';
import AdminLayout from '@/layouts/admin/layout';
import SettingsBackButton from '@/pages-scripts/portal/admin/settings/components/BackButton/BackButton.component';
import RealTimeTextFieldRow from '@/components/realtime/TextFieldRow/TextField.realtime';
import HeaderRow from '@/components/global/HeaderRow/HeaderRow.component';
import RealTimeSwitchRow from '@/components/realtime/SwitchRow/SwitchRow.realtime';
import { adminStyles } from '@/layouts/admin/layout/shared/styles/adminStyles';
import DeletePageListItem from '@/pages-scripts/portal/site/pages/delete/components/DeletePageListItem';
import DeleteSectionListItem from '@/pages-scripts/portal/site/pages/section/delete/components/DeleteSectionListItem';

function PageBuilderPage() {
  const pageDesignerLayoutContext = React.useContext(PageDesignerLayoutContext)
  const theme = useTheme();
  const router = useRouter()

  const changeUrl = (href) => {
    router.push(href)
  }

  const changeSlide = (slide, main) => {
    pageDesignerLayoutContext.setLeftDrawer(prevState => ({
      ...prevState,
      slide,
      main,
    }))
  }

  const circleStatus = {
    borderRadius: "50px",
    height: "15px",
    width: "15px",
  }

  const circleStatusDangerStyle = {
    ...circleStatus,
    backgroundColor: theme.palette.error.dark,
  }

  const circleStatusSuccessStyle = {
    ...circleStatus,
    backgroundColor: theme.palette.success.dark,
  }

  // return (<p>Page</p>)

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', p: 0 }}>
      <SettingsBackButton
        label={"Main Menu"}
        href={"/portal/site/pages/22"}
      />


      <Divider component="li" style={{ borderTopWidth: "5px" }} />
      <HeaderRow label={"Section"} />
      <br />
      <RealTimeTextFieldRow label={"test input name"} />
      <br />

      <Divider component="li" style={{ borderTopWidth: "5px" }} />
      <HeaderRow label={"Animations"} />






      <ListItem alignItems="flex-start">
        <div>
          <br />
          <p>Transitions</p>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Age"
              value={10}
              fullWidth
            // onChange={handleChange}
            >
              <MenuItem value={10}>Fade Up</MenuItem>
              <MenuItem value={20}>Fade Down</MenuItem>
            </Select>
          </FormControl>
          
        </div>
      </ListItem>
      <Divider component="li" style={{ borderTopWidth: "5px" }} />
      <HeaderRow label={"Danger Zone"} />
      <DeleteSectionListItem />


      <Divider component="li" style={{ borderTopWidth: "5px" }} />
      <HeaderRow label={"Advance Settings"} />
      <RealTimeSwitchRow id="status" label={(
        <>
          <div style={{ ...adminStyles.circleStatus, backgroundColor: theme.palette.error.dark, }}></div>
          &nbsp;
          <span>Status</span>
        </>
      )} />


      <Divider component="li" style={{ borderTopWidth: "5px" }} />
      <ListItem alignItems="flex-start">
        <ListItemText
          // primary="Advance Settings"
          secondary={
            <React.Fragment>
              <br />
              <Button variant="contained">Save</Button>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}

PageBuilderPage.getLayout = function getLayout(page) {
  return (
    <AdminLayout isPageBuilder>
      {page}
    </AdminLayout>
  )
}
export default PageBuilderPage