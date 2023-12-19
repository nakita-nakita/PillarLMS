'use client'

// libraries
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

// code
import HeaderRow from '@/components/global/HeaderRow/HeaderRow.component';
import RealTimeSwitchRow from '@/components/realtime/SwitchRow/SwitchRow.realtime';


// mui
import { useTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import SettingsBackButton from '@/pages-scripts/portal/admin/settings/components/BackButton/BackButton.component';

// icons
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { SiteDesignerPageSectionContext } from './context/SiteDesignerPageSection.context';
import NormalSectionDeletionModal from './modals/NormalSectionDeletion.modal';
import RealTimeMenu from '@/components/realtime/RealTimeMenu/RealTimeMenu';
// const DynamicNavLinksWrapper = dynamic(() => import('../../components/NavLinks/NavLinksWrapper.component'), {
//   ssr: false,
// });

function SiteDesignerPageSectionSidebar() {
  const theme = useTheme();
  const router = useRouter()

  const {
    isLoaded, setIsLoaded,
    isLoudSectionDeletionModalOpened, setIsLoudSectionDeletionModalOpened,
    // record
    id, setId,
    entity, setEntity,
    // realtime gui
    webAssetImport, setWebAssetImport,
    menu, setMenu,
    userAnswers, setUserAnswers,
    // result
    answer, setAnswer,
    // config
    isDarkMode, setIsDarkMode,

    // utils
    deleteSection,

  } = useContext(SiteDesignerPageSectionContext);

  const {
    CircleStatusSuccess,
    CircleStatusDanger,
    navigate,
  } = useContext(AdminLayoutContext)

  return (
    <>
      {isLoaded && (
        <>
          <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}>
            <SettingsBackButton
              label={"Page"}
              href={`/portal/site/pages/${router.query.pageId}`}
            />




            <Divider component="li" style={{ borderTopWidth: "12px" }} />
            <RealTimeMenu
              entity={entity}
              menu={menu?.menu}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
              onChangeByUser={(propInfo) => {
                // const socket = initSocket()

                // socket.emit('server-setting-header-change-prop', propInfo)
              }}
              setAnswer={setAnswer}
            />




            <HeaderRow label={"Danger Zone"} />
            <ListItem
              component="a"
              button
              alignItems="flex-start"
              style={{ color: 'lightcoral', textDecoration: 'none' }}
              onClick={() => {
                setIsLoudSectionDeletionModalOpened(true)
              }}
            >
              <ListItemAvatar>
                <Avatar alt="Delete icon" src="\admin\icons\Delete-Button.png" />
              </ListItemAvatar>
              <ListItemText
                primary="Delete Section"
                secondary="If at first you don't succeed, try again."
              />
            </ListItem>



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
          <NormalSectionDeletionModal
            isOpened={isLoudSectionDeletionModalOpened}
            onClose={() => {
              setIsLoudSectionDeletionModalOpened(false)
            }}
            onSubmit={() => {
              deleteSection()
            }}
          />
          <br/>
          <br/>
          <br/>
        </>
      )}
    </>
  );
}

export default SiteDesignerPageSectionSidebar





