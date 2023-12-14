'use client'

// libraries
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

// code
import { SiteDesignerPageContext } from './context/SiteDesignerPage.context';
import SelectNormalSectionModal from './modals/SelectNormalSection.modal';
import SelectLoudSectionModal from './modals/SelectLoudSection.modal';
import HeaderRow from '@/components/global/HeaderRow/HeaderRow.component';
import RealTimeSwitchRow from '@/components/realtime/SwitchRow/SwitchRow.realtime';


// mui
import { useTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PageList from '@/layouts/pageBuilderLayout/components/components/PageList/PageList';
import SettingsBackButton from '@/pages-scripts/portal/admin/settings/components/BackButton/BackButton.component';
import { IconButton } from '@mui/material';


// icons
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RealTimeResortLockedRow from '@/components/realtime/LockResortRow/LockResort.realtime';
import DeletePageListItem from '../delete/components/DeletePageListItem';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
// const DynamicNavLinksWrapper = dynamic(() => import('../../components/NavLinks/NavLinksWrapper.component'), {
//   ssr: false,
// });

function SiteDesignerPageSidebar() {
  const theme = useTheme();
  const router = useRouter()

  const {
    isLoaded,

    isLoudSectionModalOpened, setIsLoudSectionModalOpened,
    isNormalSectionModalOpened, setIsNormalSectionModalOpened,

    normalSectionBuiltInSelected,
    selectNormalSectionComponent,
    getNextNormalSectionComponent,
    getPreviousNormalSectionComponent,
  } = useContext(SiteDesignerPageContext);

  const {
    CircleStatusSuccess,
    CircleStatusDanger,
  } = useContext(AdminLayoutContext)

  const handleNewLoudSection = () => {
    setIsLoudSectionModalOpened(true)
  }

  const handleNewNormalSection = () => {
    setIsNormalSectionModalOpened(true)
  }

  return (
    <>
      {isLoaded && (
        <>
          <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}>
            <SettingsBackButton
              label={"Main Menu"}
              href={"/portal/site/pages/"}
            />


            <Divider component="li" style={{ borderTopWidth: "12px" }} />
            <HeaderRow label={"Loud Section"} />
            <ListItem>
              <div>
                <Button
                  variant="contained"
                  onClick={handleNewLoudSection}
                >
                  New Loud Section

                </Button>

              </div>
            </ListItem>
            <HeaderRow
              label={"Sections"}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" color="primary" sx={{ pr: "12px" }}
                  onClick={handleNewNormalSection}>
                  <AddCircleIcon />
                </IconButton>
              }
            />


            <Divider component="li" />
            {/* <PagePanelsDnd /> */}
            {/* <ListItem>
              <ListItemText
                primary={(<em>Nothing here</em>)}
              // secondary={secondary ? 'Secondary text' : null}
              />
            </ListItem> */}


            <RealTimeResortLockedRow />
            <PageList />

            <Divider component="li" style={{ borderTopWidth: "12px" }} />
            <HeaderRow label={"Meta Data"} />

            <ListItem
              button
              alignItems="flex-start"
              onClick={() => changeUrl(`/portal/site/pages/${router.query.pageId}/browser-tabs/`)}
            >
              <ListItemAvatar>
                <Box width={35} height={35}>
                  <img alt="browser icon" src="\admin\icons\icons8-header-100.png" width="100%" height="100%" />
                </Box>
              </ListItemAvatar>
              <ListItemText
                primary="Browser Tabs"
                secondary="Extra website styles"
              />
            </ListItem>
            <Divider component="li" style={{ borderTopWidth: "1px" }} />

            <ListItem
              button
              alignItems="flex-start"
              onClick={() => changeUrl(`/portal/site/pages/${router.query.pageId}/link/`)}
            >
              <ListItemAvatar>

                <Box width={35} height={35}>
                  <img alt="page link" src="\admin\icons\icons8-links-64.png" width="100%" height="100%" />
                </Box> </ListItemAvatar>
              <ListItemText
                primary="Links"
                secondary="When people send links between each other"
              />
            </ListItem>
            <Divider component="li" style={{ borderTopWidth: "12px" }} />

            <HeaderRow label={"Danger Zone"} />
            <DeletePageListItem onClick={() => changeUrl(`/portal/site/pages/${router.query.pageId}/delete`)} />
            <Divider component="li" style={{ borderTopWidth: "12px" }} />

            <HeaderRow label={"Advance Settings"} />
            <RealTimeSwitchRow id="status" label={(
              <>
                <CircleStatusSuccess />
                &nbsp;
                <span>Status</span>
              </>
            )} />

            <Divider component="li" style={{ borderTopWidth: "12px" }} />
            <ListItem alignItems="flex-start">
              {/* <ListItemAvatar>
        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
      </ListItemAvatar> */}
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

            <SelectLoudSectionModal
              isOpened={isLoudSectionModalOpened}
              onClose={() => {
                setIsLoudSectionModalOpened(false)
              }}
            />

            <SelectNormalSectionModal
              isOpened={isNormalSectionModalOpened}
              onClose={() => {
                setIsNormalSectionModalOpened(false)
              }}
            />

            {/* <Divider variant="inset" component="li" />
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary="Oui Oui"
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              Sandra Adams
            </Typography>
            {' — Do you have Paris recommendations? Have you ever…'}
          </React.Fragment>
        }
      />
    </ListItem> */}
          </List>
        </>
      )}
    </>
  );
}

export default SiteDesignerPageSidebar


