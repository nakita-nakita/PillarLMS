// Libraries
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';

// code
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { postDeletePageGraphQL } from '../store/postDeletePage.store';
import { getPageGraphQL } from '../store/getPage.store';

export const SiteDesignerPageDeleteContext = React.createContext();

export function SiteDesignerPageDeleteProvider({ children }) {
  const router = useRouter();

  const { navigate } = useContext(AdminLayoutContext)

  const [isLoaded, setIsLoaded] = useState(false)

  const [isDeletePageModalOpen, setIsDeletePageModalOpen] = useState(false)
  const [slug, setSlug] = useState()
  const [slugInput, setSlugInput] = useState("")

  const deletePage = () => {
    if (slug.trim() !== '') {
      postDeletePageGraphQL({
        id: router.query.pageId,
      }).then(() => {
        navigate("/portal/site/pages")

      })
    }
  }

  useEffect(() => {
    console.log('router.query.pageId', router.query)

    if (router.query?.pageId !== undefined) {
      getPageGraphQL({
        id: router.query.pageId,
      }).then(response => {
        const data = response.data.backendSiteDesignerPage_getOneById

        setSlug(data.slug)

        setIsLoaded(true)
      })
    }
  }, [])

  return (
    <SiteDesignerPageDeleteContext.Provider value={{
      isLoaded, setIsLoaded,
      isDeletePageModalOpen, setIsDeletePageModalOpen,
      slug, setSlug,
      slugInput, setSlugInput,
      deletePage
    }}>
      {children}
    </SiteDesignerPageDeleteContext.Provider>
  )
}

export default SiteDesignerPageDeleteProvider