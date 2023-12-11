'use client'

// Libraries
import React, { useContext } from 'react';

// Mine
import PreviewSocialLink from '@/components/previews/previewSocialLinks/PreviewSocialLink.component';
import { SiteDesignerPageLinkContext } from './context/SiteDesignerPageLink.context';

// MUI
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

function PagePreviewLink() {

  const {
    isLoaded,
    entity,
    title,
    titleValue, setTitleValue,
    description,
    descriptionValue, setDescriptionValue,
    picture,
    pictureValue, setPictureValue
  } = useContext(SiteDesignerPageLinkContext)


  return (
    <>
      {isLoaded && (
        <>
          <Box sx={{
            flexGrow: 1,
            width: "100%",
            maxWidth: "900px",
            m: "auto",
            padding: "20px",
            minHeight: "350px",
          }}>
            <br />
            <br />
            {isLoaded && (
              <Paper sx={{
                maxWidth: 400,
                margin: 'auto',
                overflow: 'hidden',
                marginBottom: "10px",
              }}>

                <PreviewSocialLink
                  titleValue={titleValue}
                  descriptionValue={descriptionValue}
                  imageValue={pictureValue}
                />
              </Paper>
            )}
          </Box>
        </>
      )}
    </>
  );
}

export default PagePreviewLink
