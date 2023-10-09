'use client'
// Libraries
import * as React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'

// Mine

// MUI
import { useTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
// import { useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  // ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const TabBox = styled(Paper)(({ theme }) => ({
  position: "relative",
  width: "270px",
  padding: "10px",
  height: "50px",
  // margin: "1em auto 50px",
  // textAlign: "center",
  color: "black",
  background: "#e5e5ea",
  borderRadius: "10px",
  // "& :before": {
  //   content: "",
  //   position: "absolute",
  //   zIndex: 2,
  //   top: "7px",
  //   left: "-8px",
  //   height: "20px",
  //   borderLeft: "20px solid #e5e5ea",
  //   borderBottomRightRadius: "16px 14px",
  // },
  // "& :after": {
  //   content: "",
  //   position: "absolute",
  //   zIndex: 3,
  //   top: "7px",
  //   left: "4px",
  //   width: "26px",
  //   height: "20px",
  //   background: "white",
  //   borderTopRightRadius: "14px",
  // },


  // display: 'flex',
  // alignItems: 'center',
  // padding: theme.spacing(0, 1),
  // // necessary for content to be below app bar
  // ...theme.mixins.toolbar,
  // justifyContent: 'flex-end',
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  // boxShadow: 24,
  p: 4,
};

const columns = [
  {
    id: 'name', label: 'Name', width: 180,
    // `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  { id: 'status', label: 'Status', width: 230 },

];

// const rows = [
//   // { permission: "active", lastLogin: "2d ago", role: "User", status: "active", id: 1, lastName: 'Snow', firstName: 'Jon', email: "jon.snow@company.com" },
//   // { permission: "active", lastLogin: "2d ago", role: "User", status: "active", id: 2, lastName: 'Lannister', firstName: 'Cersei', email: "lannister.cersei@company.com" },
// { id:3, name: "Art", status: "unpublished"},
// { id:4, name: "Math", status: "republished available"},
// ];

function MetaDataPreview() {
  const theme = useTheme()
  const router = useRouter()
  const [isLoaded, setIsLoaded] = React.useState(true)
  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [rows, setRows] = React.useState([]);
  const [isCreateCourseModalOpen, setIsCreateCourseModalOpen] = React.useState(false)

  const changeUrl = (href) => {

    router.push(href)
  }
  // React.useEffect(() => {
  // getManyCourses({ page: 1, pageSize: 20 }).then(response => {
  //   if (!response.errors) {
  //     if (response?.data?.rows?.length > 0) {
  //       setRows(response.data.rows)
  //     } else {
  //       setRows([])
  //     }
  //     setIsLoaded(true)
  //   }
  // })
  // }, [])

  const refreshDataTable = ({ q, page, pageSize }) => {
    const dbObj = q && q.length > 0 ? { q, page, pageSize } : { page, pageSize }
    console.log(dbObj)
    getManyCourses(dbObj).then(response => {
      if (!response.errors) {
        if (response?.data?.rows?.length > 0) {
          setRows(response.data.rows)
        } else {
          setRows([])
        }
      }
    })
  }


  const onSearch = ({ q, page, pageSize }) => {
    // refreshDataTable({ q, page, pageSize })
  }

  const onChangeRowsPerPage = ({ q, page, pageSize }) => {
    // refreshDataTable({ q, page, pageSize })
  }

  const onPageChange = ({ q, page, pageSize }) => {
    // refreshDataTable({ q, page, pageSize })
  }

  const onCreateNew = () => {
    setIsCreateCourseModalOpen(true)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsCreateCourseModalOpen(false)
    const data = new FormData(event.currentTarget);
    setCourse({ name: data.get('name'), description: data.get('description') }).then(response => {
      if (!response.errors) {
        navigate(`/admin/courses/course/?id=${response.data.id}`)
      }
    })

  }

  return (
    <>
      <br />
      <br />
      {isLoaded && (
        <Paper sx={{
          maxWidth: 936,
          margin: 'auto',
          overflow: 'hidden',
          marginBottom: "10px",
          p: 3,
        }}>
          <p>Chrome Tab</p>
          <TabBox>
            <img src="" style={{
              width: "25px",
              height: "25px",
              marginRight: "5px",
              marginLeft: "5px",
            }} />
            blah - domain.com

          </TabBox>
          <br />
          <br />
          <br />
          <p>Social Media View</p>

          <Card sx={{ display: 'flex' }}>
            <CardMedia
              component="img"
              sx={{ width: 151, backgroundColor: theme.palette.success.dark, }}
              image="/static/images/cards/live-from-space.jpg"
              alt="Live from space album cover"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                  Live From Space
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  Mac Miller
                </Typography>
              </CardContent>
            </Box>
          </Card>

          <br />
          <br />
        </Paper>
      )}
    </>
  );
}

export default MetaDataPreview
