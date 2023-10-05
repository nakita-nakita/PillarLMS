// libraries
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import moment from 'moment';

// mine
import UserChip from '@/components/chip/user.chip';
import { MediaManagerContext } from '@/pages-scripts/portal/media-manager/context/mediaManager.context';
import { SiteDesignerDiscussionContext } from '../context/siteDesignerDiscussion.context';

// mui
import { styled, alpha, useTheme } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

// icons
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ImageIcon from '@mui/icons-material/Image';
import EditIcon from '@mui/icons-material/Edit';
import EditPostModal from '../modals/EditPost.modal';
import { postSiteDesignerDiscussion_SetMyVote_GraphQL } from '../store/DiscussionSetMyVote.store';
import { postSiteDesignerDiscussionComment_setMyVote_GraphQL } from '../store/DiscussionCommentSetMyVote.store';
import EditCommentModal from '../modals/EditComment.modal';
import DeleteCommentModal from '../modals/DeleteComment.modal';
import DeletePostModal from '../modals/DeletePost.modal';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const menuItem = {
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgb(224, 224, 224)"
  }
}


export default function PostCard({ id, title, post, hasBeenEdited, createdAt, voteTotal, commentsCount, myVote, user, onClick, isCommentModeOn, }) {
  const router = useRouter()
  const theme = useTheme()


  const { setTabs, idChip, panelMeetingDoc, setPanelMeetingDoc } = useContext(AdminLayoutContext)
  const { siteDesignerDiscussion, setSiteDesignerDiscussion } = useContext(SiteDesignerDiscussionContext)

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOnClick = (event) => {
    if (onClick) {
      onClick(event, { id })
    }
  }


  const handleMenuClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setOpen(true)
  };
  const handleMenuClose = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setOpen(false);
  };

  const upVotePost = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (myVote !== "UP") {

      postSiteDesignerDiscussion_SetMyVote_GraphQL({
        discussionId: id,
        vote: "UP"
      }).then(result => {
        const newPosts = [...siteDesignerDiscussion.posts]

        for (let i = 0; i < newPosts.length; i++) {
          const post = newPosts[i];



          if (post.id === id) {
            post.myVote = "UP"

            if (myVote === "DOWN") {
              post.voteTotal = post.voteTotal + 2
            } else {
              post.voteTotal++
            }

            setSiteDesignerDiscussion(prevState => ({
              ...prevState,
              post: newPosts
            }))

            break;
          }
        }
      })

    } else {

      postSiteDesignerDiscussion_SetMyVote_GraphQL({
        discussionId: id,
        vote: "NONE"
      }).then(result => {
        const newPosts = [...siteDesignerDiscussion.posts]

        for (let i = 0; i < newPosts.length; i++) {
          const post = newPosts[i];

          if (post.id === id) {
            post.myVote = "NONE"

            post.voteTotal--

            setSiteDesignerDiscussion(prevState => ({
              ...prevState,
              post: newPosts
            }))

            break;
          }
        }
      })

    }
  }


  const downVotePost = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (myVote !== "DOWN") {

      postSiteDesignerDiscussion_SetMyVote_GraphQL({
        discussionId: id,
        vote: "DOWN"
      }).then(result => {
        const newPosts = [...siteDesignerDiscussion.posts]

        for (let i = 0; i < newPosts.length; i++) {
          const post = newPosts[i];

          if (post.id === id) {
            post.myVote = "DOWN"

            if (myVote === "UP") {
              post.voteTotal = post.voteTotal - 2
            } else {
              post.voteTotal--
            }

            setSiteDesignerDiscussion(prevState => ({
              ...prevState,
              post: newPosts
            }))

            break;
          }
        }
      })

    } else {

      postSiteDesignerDiscussion_SetMyVote_GraphQL({
        discussionId: id,
        vote: "NONE"
      }).then(result => {
        const newPosts = [...siteDesignerDiscussion.posts]

        for (let i = 0; i < newPosts.length; i++) {
          const post = newPosts[i];

          if (post.id === id) {
            post.myVote = "NONE"

            post.voteTotal++

            setSiteDesignerDiscussion(prevState => ({
              ...prevState,
              post: newPosts
            }))

            break;
          }
        }
      })
    }
  }










  const upVoteComment = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (myVote !== "UP") {

      postSiteDesignerDiscussionComment_setMyVote_GraphQL({
        commentId: id,
        vote: "UP"
      }).then(result => {
        const newComments = [...siteDesignerDiscussion.comments]

        for (let i = 0; i < newComments.length; i++) {
          const comment = newComments[i];


          if (comment.id === id) {
            comment.myVote = "UP"

            if (myVote === "DOWN") {
              comment.voteTotal = comment.voteTotal + 2
            } else {
              comment.voteTotal++
            }

            setSiteDesignerDiscussion(prevState => ({
              ...prevState,
              comment: newComments
            }))

            break;
          }
        }
      })

    } else {

      postSiteDesignerDiscussionComment_setMyVote_GraphQL({
        commentId: id,
        vote: "NONE"
      }).then(result => {
        const newComments = [...siteDesignerDiscussion.comments]

        for (let i = 0; i < newComments.length; i++) {
          const comment = newComments[i];

          if (comment.id === id) {
            comment.myVote = "NONE"

            comment.voteTotal--

            setSiteDesignerDiscussion(prevState => ({
              ...prevState,
              comment: newComments
            }))

            break;
          }
        }
      })

    }
  }


  const downVoteComment = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (myVote !== "DOWN") {

      postSiteDesignerDiscussionComment_setMyVote_GraphQL({
        commentId: id,
        vote: "DOWN"
      }).then(result => {
        const newComments = [...siteDesignerDiscussion.comments]

        for (let i = 0; i < newComments.length; i++) {
          const comment = newComments[i];

          if (comment.id === id) {
            comment.myVote = "DOWN"

            if (myVote === "UP") {
              comment.voteTotal = comment.voteTotal - 2
            } else {
              comment.voteTotal--
            }

            setSiteDesignerDiscussion(prevState => ({
              ...prevState,
              comment: newComments
            }))

            break;
          }
        }
      })

    } else {

      postSiteDesignerDiscussionComment_setMyVote_GraphQL({
        commentId: id,
        vote: "NONE"
      }).then(result => {
        const newComments = [...siteDesignerDiscussion.comments]

        for (let i = 0; i < newComments.length; i++) {
          const comment = newComments[i];

          if (comment.id === id) {
            comment.myVote = "NONE"

            comment.voteTotal++

            setSiteDesignerDiscussion(prevState => ({
              ...prevState,
              comment: newComments
            }))

            break;
          }
        }
      })
    }
  }








  const handleCommentDelete = (event, info) => {
    event.preventDefault();
    event.stopPropagation();

    setSiteDesignerDiscussion(prevState => ({
      ...prevState,
      selectedCommentId: id,
      modal_isDeleteCommentModalOpened: true,

    }))

    handleMenuClose(event)

  }

  const handleCommentEdit = (event, info) => {
    event.preventDefault();
    event.stopPropagation();

    setSiteDesignerDiscussion(prevState => ({
      ...prevState,
      selectedCommentId: id,
      modal_isEditCommentModalOpened: true,
    }))

    handleMenuClose(event)

  }
  const handlePostDelete = (event, info) => {
    event.preventDefault();
    event.stopPropagation();

    setSiteDesignerDiscussion(prevState => ({
      ...prevState,
      selectedPostId: id,
      modal_isDeletePostModalOpened: true,
    }))

    handleMenuClose(event)
  }
  const handlePostEdit = (event, info) => {
    event.preventDefault();
    event.stopPropagation();

    setSiteDesignerDiscussion(prevState => ({
      ...prevState,
      selectedPostId: id,
      modal_isEditPostModalOpened: true,

    }))
    handleMenuClose(event)
  }
  return (
    <Card onClick={isCommentModeOn ? () => { } : handleOnClick} sx={{
      ...(!router.query?.postId ? {
        //loads for main page
        cursor: "pointer",
      } : {}),
      //loads for all pages
      mb: 2
    }}>
      {/* <CardContent> */}





      <List>
        <ListItem
        // sx={{
        //   secondaryAction: { height: "100%" }
        // }}
        // secondaryAction={(
        //   <>

        //     <Button
        //       id="demo-customized-button"
        //       aria-controls={open ? 'demo-customized-menu' : undefined}
        //       aria-haspopup="true"
        //       aria-expanded={open ? 'true' : undefined}
        //       variant="contained"
        //       disableElevation
        //       onClick={handleMenuClick}
        //       endIcon={<KeyboardArrowDownIcon />}
        //     >
        //       New
        //     </Button>
        //     <StyledMenu
        //       id="demo-customized-menu"
        //       MenuListProps={{
        //         'aria-labelledby': 'demo-customized-button',
        //       }}
        //       anchorEl={anchorEl}
        //       open={open}
        //       onClose={handleMenuClose}
        //     >
        //       <MenuItem onClick={event => isCommentModeOn ? handleComentEdit(event, {}) : handlePostEdit(event, {})}>
        //         <FolderIcon />
        //         Edit
        //       </MenuItem>
        //       <Divider sx={{ my: 0.5 }} />
        //       <MenuItem onClick={event => isCommentModeOn ? handleComentDelete(event, {}) : handlePostDelete(event, {})}>
        //         <FileUploadIcon />
        //         Delete
        //       </MenuItem>
        //     </StyledMenu>



        //   </>
        // )}

        >
          {idChip.id === user.id && (
            <ListItemSecondaryAction style={{ height: "100%" }}>

              {/* <Button
              id="demo-customized-button"
              aria-controls={open ? 'demo-customized-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              variant="contained"
              disableElevation
              onClick={handleMenuClick}
              endIcon={<KeyboardArrowDownIcon />}
            >
              New
            </Button> */}

              <IconButton
                onClick={handleMenuClick}
              >
                <MoreVertIcon />
              </IconButton>
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={event => isCommentModeOn ? handleCommentEdit(event, {}) : handlePostEdit(event, {})}>
                  <EditIcon />
                  Edit
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={event => isCommentModeOn ? handleCommentDelete(event, {}) : handlePostDelete(event, {})}>
                  <DeleteIcon />
                  Delete
                </MenuItem>
              </StyledMenu>
            </ListItemSecondaryAction>
          )}

          <ListItemAvatar style={{ height: "100%", position: "absolute" }}>

            <div>
              <div style={{ marginLeft: "4px" }}>

                <ArrowUpwardIcon onClick={isCommentModeOn ? upVoteComment : upVotePost} style={{
                  color: myVote === "UP" ? theme.palette.primary.main : theme.palette.grey[300]
                }} />
              </div>
              <div style={{}}>
                <Avatar sx={{
                  background: myVote === "UP" || myVote === "DOWN" ? theme.palette.primary.main : theme.palette.grey[400]
                }}>
                  {voteTotal}
                </Avatar>
              </div>
              <div style={{
                marginLeft: "4px",
                marginTop: "4px",
              }}>
                <ArrowDownwardIcon
                  onClick={isCommentModeOn ? downVoteComment : downVotePost}
                  style={{
                    color: myVote === "DOWN" ? theme.palette.primary.main : theme.palette.grey[300]
                  }} />
              </div>
            </div>
          </ListItemAvatar>
          <ListItemText
            sx={{
              ml: "65px",
            }}
            primary={(
              <>

                {!isCommentModeOn && (
                  <h2>
                    {title}


                    <br />
                  </h2>
                )}


                <Typography variant="body2" color="text.secondary">
                  {post}
                </Typography>
                <br />
                <UserChip
                  callByType={user.callByType}
                  circleColor={user.circleColor}
                  email={user.email}
                  firstName={user.firstName}
                  labelColor={user.labelColor}
                  lastName={user.lastName}
                  picturePreview={user.pictur}
                  username={user.username}
                />

                <small>
                  <span>
                    &nbsp;&nbsp;&nbsp;{moment(parseInt(createdAt)).fromNow()}
                  </span>
                  {!isCommentModeOn && (<span>
                    &nbsp;- Comments ({commentsCount || 0})
                  </span>
                  )}
                  {hasBeenEdited && (
                    <span style={{ color: theme.palette.grey[500] }}>
                      <em>
                        &nbsp;-&nbsp;(Edited)
                      </em>
                    </span>
                  )}
                </small>

              </>
            )}
          />
        </ListItem>
      </List>











      {/* modal_isNewPostModalOpened: false,
    modal_isDeletePostModalOpened: false,
    modal_isEditPostModalOpened: false,
    modal_isEditCommentModalOpened: false,
    modal_isDeleteCommentModalOpened: false, */}


      <EditPostModal
        isOpened={siteDesignerDiscussion.modal_isEditPostModalOpened}
        onClose={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setSiteDesignerDiscussion(prevState => ({
            ...prevState,
            modal_isEditPostModalOpened: false,
          }))
        }}
        title={title}
        post={post}
        id={id}

      />

      <EditCommentModal
        isOpened={siteDesignerDiscussion.modal_isEditCommentModalOpened}
        onClose={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setSiteDesignerDiscussion(prevState => ({
            ...prevState,
            modal_isEditCommentModalOpened: false,
          }))
        }}
        post={post}
        id={id}

      />

      <DeleteCommentModal
        isOpened={siteDesignerDiscussion.modal_isDeleteCommentModalOpened}
        onClose={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setSiteDesignerDiscussion(prevState => ({
            ...prevState,
            modal_isDeleteCommentModalOpened: false,
          }))
        }}
        title={title}
        post={post}
        id={id}

      />

      <DeletePostModal
        isOpened={siteDesignerDiscussion.modal_isDeletePostModalOpened}
        onClose={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setSiteDesignerDiscussion(prevState => ({
            ...prevState,
            modal_isDeletePostModalOpened: false,
          }))
        }}
      />

    </Card>
  );
}