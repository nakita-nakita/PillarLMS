import { adminStyles } from '@/layouts/admin/layout/shared/styles/adminStyles';
import { ListItem, ListItemText, ListItemAvatar, Avatar, ListItemSecondaryAction, Tooltip } from '@mui/material';
import { Link } from 'next/link'; // or your preferred router

function DeletePageListItem({ onClick }) {
  return (
    // <Link href="/portal/site/pages/22/delete/" passHref>
    <ListItem
      component="a"
      button
      alignItems="flex-start"
      style={{ color: 'lightcoral', textDecoration: 'none' }}
      onClick={onClick}
    >
      <ListItemAvatar>
        <Avatar alt="Delete page icon" src="\admin\icons\Delete-Button.png" />
      </ListItemAvatar>
      <ListItemText
        primary="Delete Page"
        secondary="Removing a published page may not automatically de-index it from search engines. Ensure to check search engine documentation for de-indexing."
      />
    </ListItem>
    // </Link>
  );
}

export default DeletePageListItem;
