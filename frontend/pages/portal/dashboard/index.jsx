import AdminLayout from '@/layouts/admin/layout'
import React from 'react'

function DashboardPage() {
  return (
    <div>DashboardPage</div>
  )
}


DashboardPage.getLayout = function getLayout(page) {
  return (
    <AdminLayout>
      {page}
    </AdminLayout>
  )
}

export default DashboardPage