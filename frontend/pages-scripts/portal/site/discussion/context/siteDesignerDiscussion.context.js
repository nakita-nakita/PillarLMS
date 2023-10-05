// Libraries
import React from 'react'

export const SiteDesignerDiscussionContext = React.createContext();

export function SiteDesignerDiscussionProvider({ children }) {

  const [siteDesignerDiscussion, setSiteDesignerDiscussion] = React.useState({
    
    //use for selecting items in drop downs
    selectedPostId: null,
    selectedCommentId: null,

    selectPostTitle: "",


    // ui
    posts: [],
    comments: [],

    // modals
    modal_isNewPostModalOpened: false,
    modal_isDeletePostModalOpened: false,
    modal_isEditPostModalOpened: false,
    modal_isEditCommentModalOpened: false,
    modal_isDeleteCommentModalOpened: false,
  })

  return (
      <SiteDesignerDiscussionContext.Provider value={{
        siteDesignerDiscussion, setSiteDesignerDiscussion,
      }}>
          {children}
       </SiteDesignerDiscussionContext.Provider>
  )
}

export default SiteDesignerDiscussionProvider