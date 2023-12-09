'use client'
import React, { useContext } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import SettingsBackButton from '@/pages-scripts/portal/admin/settings/components/BackButton/BackButton.component';
import DeletionWarningCard from './components/DeletionWarningCard';
import { useRouter } from 'next/router';
import DeletePageModal from './modals/DeletePage.modal';
import { SiteDesignerPageDeleteContext } from './context/SiteDesignerPageDelete.context';

function PageDeleteSidebar() {
  const router = useRouter()

  const {
    isLoaded, setIsLoaded,
    isDeletePageModalOpen, setIsDeletePageModalOpen,
    slug, setSlug,
    slugInput, setSlugInput,
    deletePage
  } = useContext(SiteDesignerPageDeleteContext)

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}>
      <SettingsBackButton
        label={"Main Menu"}
        href={`/portal/site/pages/${router.query.pageId}`}
      />

      <ListItem alignItems="flex-start">
        <DeletionWarningCard onClick={() => setIsDeletePageModalOpen(true)} />
      </ListItem>

      <DeletePageModal
        isOpened={isDeletePageModalOpen}
        onClose={() => {
          setIsDeletePageModalOpen(false)
        }}
      />
    </List>
  );
}

export default PageDeleteSidebar