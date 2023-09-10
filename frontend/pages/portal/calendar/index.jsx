'use client'

// Library
import React from 'react'

// Mine
import AdminLayout from '@/layouts/admin/layout';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import Calendar from '@/pages-scripts/portal/calendar/calendar.component';

// MUI
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from '@fullcalendar/timegrid'

const Page = () => {
  const { setTabs } = React.useContext(AdminLayoutContext)

  React.useEffect(() => {
    setTabs(prevState => ({
      ...prevState,
      tabs: null,
    }))

  }, [])

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={3}>


          <Button variant="contained">New</Button>
          <Calendar />
        </Grid>
        <Grid item xs={9}>
          <FullCalendar
            editable
            selectable
            headerToolbar={null}
            // events={events}
            // headerToolbar={{
            //   start: "today prev next",
            //   end: "dayGridMonth dayGridWeek dayGridDay",
            // }}
            // plugins={[daygridPlugin]}
            plugins={[timeGridPlugin]}
            initialView='timeGridWeek'
            // defaultView={"dayGridWeek"}
          />
        </Grid>
      </Grid>
      {/* <Stack spacing={2} direction="row">
        <Button variant="contained" color="success">New</Button>
        <FilterToggle />
      </Stack>
      <br />
      <br />
      <PostCard /> */}
    </>
  )
}

Page.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}

export default Page