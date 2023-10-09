import AdminLayout from '@/layouts/admin/layout'
import React from 'react'

function AnalyticsPage() {
  return (
    <div>AnalyticsPage</div>
  )
}


AnalyticsPage.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}

export default AnalyticsPage