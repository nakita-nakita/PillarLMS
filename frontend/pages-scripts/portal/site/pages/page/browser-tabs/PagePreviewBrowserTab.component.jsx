'use client'
// Libraries
import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'

// Mine

// MUI
import { useTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import PreviewChromeTab from '@/components/previews/ChromeTab/PreviewChromeTab.component';
import { SiteDesignerPageBrowserContext } from './context/SiteDesignerPageBrowser.context';


function PagePreviewBrowserTabs() {
  const theme = useTheme()
  const router = useRouter()

  const {
    isLoaded, setIsLoaded,
    entity, setEntity,
    slug, setSlug,
    tabName, setTabName,
    tabNameValue, setTabNameValue,
    favicon, setFavicon,
    tabOrgName, setTabOrgName,
  } = useContext(SiteDesignerPageBrowserContext)



  return (

    <Box sx={{
      flexGrow: 1,
      width: "100%",
      maxWidth: "900px",
      m: "auto",
      padding: "20px",
      minHeight: "350px",
    }}>
      <br />
      <br />
      {isLoaded && (
        // <Paper sx={{
        //   maxWidth: 936,
        //   margin: 'auto',
        //   overflow: 'hidden',
        //   marginBottom: "10px",
        //   p: 3,
        // }}>

        <PreviewChromeTab
          favicon={favicon}
          leftTab={tabNameValue}
          rightTab={tabOrgName}
          url={`example.com${slug}`}
        />
        // </Paper>
      )}
    </Box>
  );
}

export default PagePreviewBrowserTabs
