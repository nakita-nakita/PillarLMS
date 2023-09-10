'use client'

import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
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
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PageDesignerLayoutContext from '../../../pageDesignerLayout.context';

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

export default function PanelDnD({ children }) {
  const theme = useTheme();
  const pageDesignerLayoutContext = React.useContext(PageDesignerLayoutContext)

  const changeSlide = (slide) => {
    pageDesignerLayoutContext.setLeftDrawer(prevState => ({
      ...prevState,
      slide,
    }))
  }

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const circleStatus = {
    borderRadius: "50px",
    height: "15px",
    width: "15px",
    display: "inline-block",
    marginRight: "5px",
  }

  const circleStatusDangerStyle = {
    ...circleStatus,
    backgroundColor: theme.palette.error.dark,
  }

  const circleStatusSuccessStyle = {
    ...circleStatus,
    backgroundColor: theme.palette.success.dark,
  }

  return (
    <Card sx={{
      maxWidth: 345,
      borderRadius: 0,
      backgroundColor: theme.palette.grey[200],
      mb: 1,
      display: "block",

    }}>
      <CardHeader

        action={
          (<>

            <IconButton aria-label="edit panel" onClick={() => changeSlide("PANEL")} >
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete panel">
              <DeleteIcon />
            </IconButton>
          </>)
        }
        subheader={(
          <>
            <div style={circleStatusDangerStyle}>

            </div>
            {children || "Panel Type"}

          </>
        )}
      />
    </Card>
  );
}