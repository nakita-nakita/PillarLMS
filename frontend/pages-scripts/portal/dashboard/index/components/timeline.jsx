import React from 'react';
import Timeline, { DateHeader, SidebarHeader, TimelineHeaders } from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';

const TimelineComponent = () => {
  // Placeholder data for the timeline
  const items = [
    { id: 1, group: 1, title: 'Rome', start_time: new Date(2024, 0, 1), end_time: new Date(2024, 0, 5) },
    { id: 2, group: 2, title: 'Ready/Not Ready', start_time: new Date(2024, 0, 3), end_time: new Date(2024, 0, 7) },
  ];

  const groups = [
    { id: 1, title: 'Projects' },
    { id: 2, title: 'Ready/Not Ready' },
  ];

  return (
    <Timeline
      groups={groups}
      items={items}
      defaultTimeStart={new Date(2024, 0, 1)}
      defaultTimeEnd={new Date(2024, 0, 31)}
    >

      <TimelineHeaders calendarHeaderStyle={{ background: 'rgb(66, 66, 66)', color: '#fff' }}>
        <SidebarHeader >
          {({ getRootProps, }) => {
            return <div {...getRootProps()}></div>
          }}
        </SidebarHeader>
        <DateHeader unit="primaryHeader" style={{ color: "rgb(66, 66, 66)" }} />
        <DateHeader style={{ color: "rgb(66, 66, 66)" }} />
      </TimelineHeaders>
    </Timeline>
  );
};

export default TimelineComponent;
