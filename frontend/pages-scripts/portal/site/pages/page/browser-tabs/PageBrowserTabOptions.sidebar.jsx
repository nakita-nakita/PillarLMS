'use client'

// library
import React, { useContext } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

// code
import HeaderRow from '@/components/global/HeaderRow/HeaderRow.component';
import SettingsBackButton from '@/pages-scripts/portal/admin/settings/components/BackButton/BackButton.component';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { SiteDesignerPageBrowserContext } from './context/SiteDesignerPageBrowser.context';

// mui
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

//dynamic
const DynamicRealTimeTextField = dynamic(() => import('@/components/realtime/TextFieldRow/TextField.realtime'), {
  ssr: false
});


function PageBrowserTabSidebar() {
  const router = useRouter()

  // const { setLeftDrawer, idChip, panelMeetingDoc, setPanelMeetingDoc } = React.useContext(AdminLayoutContext)

  const {
    isLoaded, setIsLoaded,
    entity, setEntity,
    tabName, setTabName,
    tabNameValue, setTabNameValue,
    favicon, setFavicon,
    tabOrgName, setTabOrgName,
    save,
  } = useContext(SiteDesignerPageBrowserContext)

  const handleClick = () => {
    save({
      pageId: router.query.pageId,
      tabName: tabNameValue,
    })

  }

  return (
    <>
      {isLoaded && (
        <>
          <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}>
            <SettingsBackButton
              label={"Main Menu"}
              href={`/portal/site/pages/${router.query.pageId}`}
            />


            <Divider component="li" style={{ borderTopWidth: "5px" }} />
            <HeaderRow label={"Browser Tab Options"} />
            <br />
            <DynamicRealTimeTextField
              label={"Page Name"}
              data={tabName}
              entity={entity}
              onTextUpdate={(text) => {
                setTabNameValue(text)
              }}
            />
            <br />


            <Divider component="li" style={{ borderTopWidth: "5px" }} />

            <ListItem alignItems="flex-start">
              <ListItemText
                // primary="Advance Settings"
                secondary={
                  <React.Fragment>
                    <br />
                    <Button onClick={handleClick} variant="contained">Save</Button>
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </>
      )}
    </>
  );
}

export default PageBrowserTabSidebar