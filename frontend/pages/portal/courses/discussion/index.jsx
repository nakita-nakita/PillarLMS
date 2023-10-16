import AdminLayout from '@/layouts/admin/layout'
import React from 'react'

function CourseDiscussionPage() {
  return (
    <div>CourseDiscussionPage</div>
  )
}

CourseDiscussionPage.getLayout = function getLayout(page) {
  return (
    <AdminLayout
      hasNoEntity
    >
      {page}
    </AdminLayout>
  )
}

export default CourseDiscussionPage

