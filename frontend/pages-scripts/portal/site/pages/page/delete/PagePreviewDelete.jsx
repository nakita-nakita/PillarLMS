'use client'
// Libraries
import React, { useContext } from 'react';

// Mine
import { SiteDesignerPageDeleteContext } from './context/SiteDesignerPageDelete.context';
import DeletionWarningCard from './components/DeletionWarningCard';

// MUI
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

function PagePreviewDelete() {

  const {
    isLoaded,
    isDeletePageModalOpen, setIsDeletePageModalOpen,
    slug, setSlug,
    slugInput, setSlugInput,
    deletePage
  } = useContext(SiteDesignerPageDeleteContext)

  return (

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
          <DeletionWarningCard onClick={() => setIsDeletePageModalOpen(true)} />
        </Paper>
      )}
    </Box>
  );
}

export default PagePreviewDelete
