import React, { useContext, useState } from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, Button, Menu, MenuItem, Link } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { SiteDesignerPageContext } from '../context/SiteDesignerPage.context';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { useRouter } from 'next/router';

const LoudSectionItem = ({ onSelectEdit, onSelectDelete, onSelectCreateSummary }) => {
  const router = useRouter();

  const {
    navigate,
  } = useContext(AdminLayoutContext)

  const {
    isLoaded,

    isLoudSectionModalOpened, setIsLoudSectionModalOpened,
    isNormalSectionModalOpened, setIsNormalSectionModalOpened,

    createNormalSection,
    createLoudSection,


    isReady, setIsReady,
    isReadyValue, setIsReadyValue,

    entity,

    loudSection, setLoudSection,
    sections, setSections,

  } = useContext(SiteDesignerPageContext);


  const [anchorEl, setAnchorEl] = useState(null);



  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  loudSection, setLoudSection

  return (
    <>
      {isLoaded && (
        <>
          <ListItem>
            {loudSection?.id ? (
              <>
                <Link
                  style={{
                    cursor: "pointer",
                    paddingLeft: "5px",
                  }}
                  onClick={() => navigate(`/portal/site/pages/${router.query.pageId}/loud-section/${loudSection.id}`)}
                >
                  <ListItemText
                    primary={loudSection.name}
                    secondary={loudSection.author}
                  />
                </Link>
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={handleClick}
                    aria-controls="loud-section-menu"
                    aria-haspopup="true"
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="loud-section-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={() => { onSelectEdit(id); handleClose(); }}>Edit</MenuItem>
                    <MenuItem onClick={() => { onSelectDelete(id); handleClose(); }}>Delete</MenuItem>
                  </Menu>
                </ListItemSecondaryAction>
              </>
            ) : (
              <>
                <ListItemText
                  primary="Click to create a page summary section on top."
                  secondary={(
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={onSelectCreateSummary}
                    >
                      Create
                    </Button>
                  )}
                />

              </>
            )}
          </ListItem>
        </>
      )}
    </>
  );
};

export default LoudSectionItem;
