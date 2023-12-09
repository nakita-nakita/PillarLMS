// libraries
import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router';

// mine
import { SiteDesignerPageDeleteContext } from '../context/SiteDesignerPageDelete.context';
import InformationModal from '@/components/modals/Information.modal';

//mui
import { Button, TextField, Box, Typography } from '@mui/material';

function DeletePageModal({ isOpened, onClose }) {
  const {
    slug, setSlug,
    slugInput, setSlugInput,
    deletePage
  } = useContext(SiteDesignerPageDeleteContext)

  const handleSubmit = () => {

    if (slug === slugInput) {
      deletePage()
    }
  }

  return (
    <InformationModal
      isOpened={isOpened}
      onClose={onClose}
      header="Delete Page"
      onSubmit={handleSubmit}
      submitLabel={"Delete"}
    >
      <Typography variant="h6" gutterBottom>
        Enter the page slug to delete the page:
        <br />
        "{slug}"
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          label="Slug"
          variant="outlined"
          fullWidth
          value={slugInput}
          onChange={(e) => setSlugInput(e.target.value)}
        />
      </Box>
      {/* </Box> */}
    </InformationModal>
  )
}

// NewMeetingModal.propTypes = {
//   isOpened: PropTypes.boolean,
//   onClose: PropTypes.func,
// }

export default DeletePageModal
