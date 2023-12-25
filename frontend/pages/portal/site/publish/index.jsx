// Libraries
import React, { useState, useEffect, useContext } from 'react';

// Mine
import tabsJson from '@/pages-scripts/portal/site/tabs.json';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import AdminLayout from '@/layouts/admin/layout';

// MUI
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SiteDesignerPublishProvider, { SiteDesignerPublishContext } from '@/pages-scripts/portal/site/publish/context/SiteDesignerPublish.context';
import PublishModal from '@/pages-scripts/portal/site/publish/modals/publish.modal';
import moment from 'moment';

const PublishPage = () => {

  const { setTabs } = useContext(AdminLayoutContext);
  const {
    isLoaded, setIsLoaded,
    isNewPublishModalOpen, setIsNewPublishModalOpen,
    publishRecords, setPublishRecords,
    // utils
    openPublishModal,
    publishWebsite,
  } = useContext(SiteDesignerPublishContext)


  const [isPublishing, setIsPublishing] = useState(false);
  const [publishHistory, setPublishHistory] = useState([]);

  useEffect(() => {
    setTabs((prevState) => ({
      ...prevState,
      tabs: tabsJson.tabs,
      selectedValue: 2,
    }));

  }, [setTabs]);

  const handlePublish = () => {
    // Simulate an API call or publishing process
    // setIsPublishing(true);
    openPublishModal()
  };

  return (
    <Box sx={{
      flexGrow: 1,
      width: "100%",
      maxWidth: "900px",
      m: "auto"
    }}>
      <>
        {isLoaded && (
          <>
            <Paper elevation={3} sx={{ display: 'flex' }}>
              {/* Publish Section */}
              <Box sx={{ flexBasis: '30%', marginRight: '2%', padding: '20px' }}>
                <h2 style={{ marginBottom: '20px', textAlign: "center" }}>Publish</h2>
                <Stack spacing={2} direction="row" justifyContent="center">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handlePublish}
                    disabled={isPublishing}
                    sx={{ minWidth: '120px', fontWeight: 'bold' }}
                  >
                    {isPublishing ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      'Release'
                    )}
                  </Button>
                </Stack>
                <br />
              </Box>

              {/* Publish History Table */}
              <Box sx={{ flexBasis: '68%' }}>
                <TableContainer component={Paper} sx={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  background: '#f8f8f8',
                  height: "150px",
                }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Number of Pages</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {publishRecords.map((entry, index) => (
                        <TableRow key={index}>
                          <TableCell>{moment(parseInt(entry.createdAt)).fromNow()}</TableCell>
                          <TableCell>{entry.numberOfPages}</TableCell>
                        </TableRow>
                      ))}

                      {publishRecords.length === 0 && (
                        <TableRow>
                          <TableCell
                            className='text-center'
                            colSpan={2}
                          >
                            Nothing here.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Paper>
          </>
        )}
      </>
      <PublishModal
        isOpened={isNewPublishModalOpen}
        onClose={() => {
          setIsNewPublishModalOpen(false)
        }}
        onSubmit={() => {
          publishWebsite()
        }}
      />
    </Box>
  );
};

PublishPage.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      <SiteDesignerPublishProvider>
        {page}
      </SiteDesignerPublishProvider>
    </AdminLayout>
  )
};

export default PublishPage;
