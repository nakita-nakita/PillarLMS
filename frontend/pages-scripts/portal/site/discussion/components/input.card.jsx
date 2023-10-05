import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import FilledInput from '@mui/material/FilledInput';

import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { postSiteDesignerDiscussionComment_addOne_GraphQL } from '../store/DiscussionCommentAdd.store';
import { getSiteDesignerDiscussionComment_getOneById_GraphQL } from '../store/DiscussionCommentGetById.store';
import { SiteDesignerDiscussionContext } from '../context/siteDesignerDiscussion.context';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function InputCard() {
  const router = useRouter()

  const { siteDesignerDiscussion, setSiteDesignerDiscussion } = useContext(SiteDesignerDiscussionContext)


  const [post, setPost] = React.useState("")

  const handleSubmit = (event) => {
    postSiteDesignerDiscussionComment_addOne_GraphQL({
      discussionId: router.query.postId,
      post,
    }).then(addOneResult => {

      const commentId = addOneResult.data.backendSiteDesignerDiscussionComment_addOne.id

      getSiteDesignerDiscussionComment_getOneById_GraphQL({
        id: commentId
      }).then(result => {

        const comment = result.data.backendSiteDesignerDiscussionComment_getOneById
        const newComments = [...siteDesignerDiscussion.comments]
        newComments.push(comment)
        
        setSiteDesignerDiscussion(prevState => ({
          ...prevState,
          comments: newComments
        }))

        setPost([""])



      })

    })
  }

  return (
    <Card>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={1}>
          </Grid>
          <Grid item xs={11}>

            <FormControl variant="filled" sx={{ width: "100%" }}>
              <InputLabel htmlFor="component-filled">Respond</InputLabel>
              <FilledInput
                id="component-filled"
                multiline rows={4}
                value={post}
                onChange={event => setPost(event.target.value)}
              />
              {/* <TextField
                id="standard-multiline-static"
                label="Repos"
                multiline
                rows={4}
                defaultValue="Default Value"
                variant="standard"
              /> */}
            </FormControl>
            <br />
            <br />
            <Button variant='contained' onClick={handleSubmit}>Post</Button>
            <br />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}