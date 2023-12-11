'use client'

// libraries
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

// code
import HeaderRow from '@/components/global/HeaderRow/HeaderRow.component';
import SettingsBackButton from '@/pages-scripts/portal/admin/settings/components/BackButton/BackButton.component';
import { SiteDesignerPageLinkContext } from './context/SiteDesignerPageLink.context';

// mui
import { useTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import RealTimeMediaSelectionRow from '@/components/realtime/MediaSelectionRow/MediaSelection';

//dynamic
const DynamicRealTimeTextField = dynamic(() => import('@/components/realtime/TextFieldRow/TextField.realtime'), {
  ssr: false
});


function PageLinkSidebar() {
  const theme = useTheme();
  const router = useRouter()

  const {
    isLoaded,
    entity,
    title,
    setTitleValue,
    description,
    setDescriptionValue,
    picture,
    setPictureValue,
    save,
  } = useContext(SiteDesignerPageLinkContext)

  const handleSave = () => {
    save()
  }

  return (
    <>
      {isLoaded && (
        <>
          <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}>
            <SettingsBackButton
              label={"Page"}
              href={`/portal/site/pages/${router.query.pageId}`}
            />







            <Divider component="li" style={{ borderTopWidth: "5px" }} />
            <HeaderRow label={"Messenger Link Data"} />
            <br />
            <DynamicRealTimeTextField
              data={title}
              label={"Title"}
              entity={entity}
              onTextUpdate={(text) => {
                setTitleValue(text)
              }}
            />

            <DynamicRealTimeTextField
              data={description}
              label={"Description"}
              entity={entity}
              onTextUpdate={(text) => {
                setDescriptionValue(text)
              }}
            />

            <RealTimeMediaSelectionRow
              data={picture}
              entity={entity}
              onChange={(value) => {
                setPictureValue(value)
              }}
            />


            <Divider component="li" style={{ borderTopWidth: "5px" }} />
            <ListItem alignItems="flex-start">
              <ListItemText
                // primary="Advance Settings"
                secondary={
                  <React.Fragment>
                    <br />
                    <Button variant="contained" onClick={handleSave}>Save</Button>
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

export default PageLinkSidebar