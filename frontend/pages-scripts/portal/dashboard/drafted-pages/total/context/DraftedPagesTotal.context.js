// Libraries
import React, { useContext, useState } from 'react'
import { postNewPageGraphQL } from '../store/postNewPage.store';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';

export const SiteDesignerPagesContext = React.createContext();

export function SiteDesignerPagesProvider({ children }) {

  const { navigate } = useContext(AdminLayoutContext)

  const [isNewPageModalOpen, setIsNewPageModalOpen] = useState(false)
  const [slug, setSlug] = useState("")
  const [hasHomePage, setHasHomePage] = useState(false)

  const onCreatePage = ({ url }) => {
    postNewPageGraphQL({
      slug: url,
    }).then(response => {
      const data = response.data.backendSiteDesignerPage_addOne

      navigate(`/portal/site/pages/${data.id}`)

    })
  }

  const createPage = () => {
    if (slug.trim() !== '') {
      onCreatePage({
        url: `/p/${slug}`
      })

    }
  }

  const createHomePage = () => {
    onCreatePage({
      url: "/"
    })
  }

  return (
    <SiteDesignerPagesContext.Provider value={{
      isNewPageModalOpen, setIsNewPageModalOpen,
      slug, setSlug,
      hasHomePage,
      createPage,
      createHomePage,
    }}>
      {children}
    </SiteDesignerPagesContext.Provider>
  )
}

export default SiteDesignerPagesProvider