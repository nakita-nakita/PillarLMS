// libraries
import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router';

// mine
import { SiteDesignerPagesContext } from '../context/SiteDesignerPages.context';
import InformationModal from '@/components/modals/Information.modal';

//mui
import { Button, TextField, Box, Typography } from '@mui/material';

function NewPageModal({ isOpened, onClose }) {
  const {
    slug, setSlug,
    hasHomePage,
    createPage,
    createHomePage,
  } = useContext(SiteDesignerPagesContext)

  const handleSubmit = () => {

    if (onClose) {
      onClose()
    }

    createPage()
  }

  const handleCreateHomePage = () => {
    
    if (onClose) {
      onClose()
    }

    createHomePage()
  }

  // // CreatePageForm.js
  // import React, { useState } from 'react';
  // import { Button, TextField, Box, Typography } from '@mui/material';

  // const CreatePageForm = ({ onCreatePage }) => {
  //   const [slug, setSlug] = useState('');

  //   const handleCreatePage = () => {
  //     // Perform any necessary validation before creating the page
  //     if (slug.trim() !== '') {
  //       onCreatePage(slug);
  //     }
  //   };

  //   return (
  //     <Box
  //       sx={{
  //         width: 400,
  //         bgcolor: 'background.paper',
  //         boxShadow: 24,
  //         p: 4,
  //       }}
  //     >
  //       <Typography variant="h6" gutterBottom>
  //         Choose a Slug for the New Page
  //       </Typography>
  //       <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
  //         <Typography variant="body1" sx={{ mr: 1 }}>
  //           /p/
  //         </Typography>
  //         <TextField
  //           label="Slug"
  //           variant="outlined"
  //           fullWidth
  //           value={slug}
  //           onChange={(e) => setSlug(e.target.value)}
  //         />
  //       </Box>
  //       <Button variant="contained" onClick={handleCreatePage}>
  //         Create Home Page
  //       </Button>
  //     </Box>
  //   );
  // };

  // export default CreatePageForm;


  return (
    <InformationModal
      isOpened={isOpened}
      onClose={onClose}
      header="Create Page"
      onSubmit={handleSubmit}
      submitLabel={"Create"}
    >
      {/* <Box
        sx={{
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      > */}
      <Typography variant="h6" gutterBottom>
        Choose a Slug for the New Page
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="body1" sx={{ mr: 1 }}>
          /p/
        </Typography>
        <TextField
          label="Slug"
          variant="outlined"
          fullWidth
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
      </Box>
      <Button variant="contained" onClick={handleCreateHomePage} disable={hasHomePage}>
        Create Home Page
      </Button>
      {/* </Box> */}
    </InformationModal>
  )
}

// NewMeetingModal.propTypes = {
//   isOpened: PropTypes.boolean,
//   onClose: PropTypes.func,
// }

export default NewPageModal
