'use client'

// Library
import React from 'react'

// Mine
import AdminLayout from '@/layouts/admin/layout';
import PageTemplateBuilderLayout from '@/layouts/pageTemplateBuilderLayout/layout';

const PageTemplateBuilder = () => {
  return (
    <div>PageTemplateBuilder</div>
  )
}

PageTemplateBuilder.getLayout = function getLayout(page) {
  return (
    <PageTemplateBuilderLayout>
      {page}
    </PageTemplateBuilderLayout>
  )
}
export default PageTemplateBuilder