'use client'

// Library
import React from 'react'

// Mine
import PageBuilderLayout from '@/layouts/pageBuilderLayout/layout';

const PageBuilderPage = () => {
  return (
    <div>PageBuilderPage</div>
  )
}

PageBuilderPage.getLayout = function getLayout(page) {
  return (
    <PageBuilderLayout>
      {page}
    </PageBuilderLayout>
  )
}
export default PageBuilderPage