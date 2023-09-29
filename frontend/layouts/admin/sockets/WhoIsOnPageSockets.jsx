// libraries
import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router';

// mine
import AdminLayoutContext from '../layout/adminLayout.context'
import { enqueueSnackbar } from 'notistack'
import EveryoneOnPageModal from '../layout/components/Header/EveryoneOnPage.modal';
import { initSocket } from '@/utils/realtime/socket';
import { getWhoIsOnPageGraphQL } from '../store/whoIsOnPage.store';

function WhoIsOnPageSockets({ children }) {
  const router = useRouter();
  const { setWhoIsOnPage, whoIsOnPage, panelMeetingDoc, idChip } = useContext(AdminLayoutContext)

  const [lastRoute, setLastRoute] = React.useState({
    pathname: undefined,
    asPath: undefined
  })

  const refreshWhoIsOnPage = async ({ url }) => {
    const usersOnPage = await getWhoIsOnPageGraphQL({ url, })

    setWhoIsOnPage(prevState => ({
      ...prevState,
      list: usersOnPage.data.collaborateWhoIsOnPage_getAllUsersFromPage.users,
      total: usersOnPage.data.collaborateWhoIsOnPage_getAllUsersFromPage.total,
    }))
  }

  useEffect(() => {
    const socket = initSocket()

    socket.emit('server-change-url', {
      currentAsPath: router.asPath,
      currentPathname: router.pathname,
      oldAsPath: lastRoute?.asPath,
      oldPathname: lastRoute?.pathname,
    });

    setLastRoute({
      pathname: router.pathname,
      asPath: router.asPath,
    })

    // user left page
    socket.on('user-left-page', async (data) => {
      await refreshWhoIsOnPage({ url: router.pathname })
      enqueueSnackbar(data.message)
    })

    // toast
    // refreshWhoIsOnPage

    //user enter page
    socket.on('user-enter-page', async (data) => {
      await refreshWhoIsOnPage({ url: router.pathname })
      enqueueSnackbar(data.message)
    })

    refreshWhoIsOnPage({ url: router.pathname })

    return () => {
      socket.off('user-enter-page')
      socket.off('user-left-page')
    }

  }, [router.pathname]);

  //Easier to put this one meeting function into this file because this file focuses on routing.
  React.useEffect(() => {
    // router updated instead of adminLayoutContext
    if (router.pathname !== lastRoute.pathname) {
      //if there is a meeting and you are the leader, emit url change to everyone else.
      if (panelMeetingDoc.id && idChip.id === panelMeetingDoc.leader?.id) {
        const socket = initSocket()

        socket.emit("server-meeting-url-change", {
          meetingId: panelMeetingDoc.id,
          url: router.pathname,
        })
      }
    }

  }, [router.pathname, panelMeetingDoc, idChip])

  return (
    <div>
      {children}
      <EveryoneOnPageModal
        isOpened={whoIsOnPage.modal_isEveryoneOnPageModalOpened}
        onClose={() =>
          setWhoIsOnPage(prevState => ({
            ...prevState,
            modal_isEveryoneOnPageModalOpened: false,
          }))}
      />
    </div>
  )
}

export default WhoIsOnPageSockets