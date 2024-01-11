// libraries
import React, { useContext, useState } from 'react';

// mine
import InformationModal from '@/components/modals/Information.modal';

// MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';


function TimelineModal({ isOpened, onClose }) {

  const { navigate } = useContext(AdminLayoutContext);

  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      url: "/portal/dashboard",
      name: 'Rome',
      color: '#FF5733',
      startTime: 'Jan 01, 2023',
      endTime: '',
    },
    {
      url: "/portal/dashboard/project/42",
      name: 'Optimus',
      color: '#33FF57',
      startTime: 'Dec 01, 2022',
      endTime: 'Jan 01, 2023',
    },
    // Add more projects as needed
  ];

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };


  return (
    <InformationModal
      isOpened={isOpened}
      onClose={() => {
        onClose();
        setSelectedProject(null);
      }}
      header="Project Timeline"
      submitLabel="Change Leader"
      disableSubmit
    >
      <Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Color</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project, index) => (
                <TableRow
                  key={index}
                  onClick={() => navigate(project.url)}
                  sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f0f0f0' } }}
                >
                  <TableCell>

                    <Box
                      sx={{
                        width: '18px', // Adjust the width of the colored box
                        height: '18px',
                        border: "3px solid rgb(66, 66, 66)",
                        backgroundColor: project.color, // Change the background color
                        borderRadius: '0', // Adjust the border radius
                        marginRight: '16px', // Adjust the spacing between the box and text
                        display: "inline-block",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Typography variant="body2" marginLeft="8px">
                        {project.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{project.startTime}</TableCell>
                  <TableCell>{project.endTime}</TableCell>
                  <TableCell>
                    <Button variant="outlined" size="small" onClick={() => handleProjectClick(project)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </InformationModal>
  );
}

export default TimelineModal;
