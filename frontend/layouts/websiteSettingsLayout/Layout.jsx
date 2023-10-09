'use client'

// Libraries
import * as React from 'react';


// mine
import InsideWebsiteSettingLayout from './WebsiteSettingLayout';
import { WebsiteSettingLayoutProvider } from './WebsiteSettingLayout.context';
import WhoIsOnPageSockets from '../admin/sockets/WhoIsOnPageSockets';
import NotificationSockets from '../admin/sockets/NotificationsSockets';
import MeetingSockets from '../admin/sockets/MeetingSockets';


export default function WebsiteSettingLayout({ ...props }) {
  return (
    <WebsiteSettingLayoutProvider>
      <InsideWebsiteSettingLayout {...props} />
    </WebsiteSettingLayoutProvider>
  );
}

