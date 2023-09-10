'use client'

// Library
import React from 'react'

// Mine
import AdminLayout from '@/layouts/admin/layout';

// MUI
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import FolderIcon from '@mui/icons-material/Folder';

const MediaManager = () => {
	return (
		<Box sx={{
			flexGrow: 1,
			width: "100%",
			maxWidth: "900px",
			m: "auto"
		}}>
			<Paper elevation={3} sx={{ padding: "20px", minHeight: "350px" }}>
				{/* import FolderIcon from '@mui/icons-material/Folder'; */}
				<Grid container spacing={2}>
					<Grid item xs={2}>
						<FolderIcon sx={{fontSize:"50px"}} />
						<br/>
						Folder 1
					</Grid>
					<Grid item xs={2}>
						
					<img src="asdf/asdf" style={{width:"50px"}} />
						<br/>
						Image 1
					</Grid>
				</Grid>

			</Paper>
		</Box>
	)
}

MediaManager.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}

export default MediaManager