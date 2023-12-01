// Library
import React, { useEffect, useState } from 'react'
import { parse } from 'cookie';

// mine
import MainSiteLayout from '@/layouts/mainSiteLayout/layout';
import { getSocketId, initSocket } from '@/utils/realtime/socket';
import { getSettingFooterRealTimeGraphQL } from '@/pages-scripts/portal/admin/settings/pages/footer/store/settingFooter_getRealTime.store';
import DynamicComponent from '@/components/previews/DynamicComponent/DynamicComponent.component'
import { callApiMiddlewareWithToken, callSubDomainApiMiddlewareWithToken } from '@/utils/graphql/backend-api.middleware';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';

const PreviewFooterPage = (props) => {
  const theme = useTheme()
  const router = useRouter()

  const [isDayMode, setIsDayMode] = useState(true)
  const [backgroundColor, setBackgroundColor] = useState(theme.palette.grey[200])

  const [isLoaded, setIsLoaded] = useState(false)
  const [entity, setEntity] = useState()
  const [componentProps, setComponentProps] = useState({})
  const [webAssetImport, setWebAssetImport] = useState()

  const initData = (isDayModeVar) => {
    
    getSettingFooterRealTimeGraphQL({
      socketId: getSocketId()
    }).then(response => {

      const data = response.data.backendSettingFooter_getOneRealTime

      const user = (JSON.parse(data.userAnswersJsonB))

      setComponentProps({
        data: {
          user,
          system: {
            state: {
              isDisplayMode: false,
              isFunctionalMode: true,
              isDevMode: true,
              isProdMode: false,
              isDayMode: isDayModeVar,
              isNightMode: !isDayModeVar,
            },
            utils: {
              getContrastTextClass,
              getContrastTextClassWithHover,
            },
            // socials
          }
        }
      })
      setWebAssetImport(data.webAssetImport)
      setEntity(data.entity)
      setIsLoaded(true)
    })
  }
  useEffect(() => {

    if (router.query.mode) {
      const { mode: modeQueryParam } = router.query;

      switch (modeQueryParam.toString()) {
        case "night":
          setBackgroundColor(theme.palette.grey[800])
          setIsDayMode(false)
          initData(false)
          break;
        case "day":
          setBackgroundColor(theme.palette.grey[200])
          setIsDayMode(true)
          initData(true)
          break;

        default:
          setBackgroundColor(theme.palette.grey[800])
          setBackgroundColor(theme.palette.grey[800])
          break;
      }

    }



  }, [router.query]);

  useEffect(() => {
    const socket = initSocket()

    socket.on('setting-footer-change-prop', data => {
      console.log('setting-footer-change-prop', data)
      if (data.name !== undefined && data.value !== undefined) {
        setComponentProps(prevState => {
          prevState.data.user[data.name] = data.value

          return { ...prevState }
        })
      }
    })

    return () => {
      socket.off('setting-footer-change-prop')

      socket.emit('server-samedoc-unsub-entity', { entity })
    }
  }, [])


  const getContrastTextClass = (color) => {
    const contrastText = theme.palette.getContrastText(color)
    switch (contrastText) {
      case "#fff":
        return "text-gray-100";

      case "rgba(0, 0, 0, 0.87)":
        return "text-gray-800";

      default:
        return "text-gray-800";
    }
  }

  const getContrastTextClassWithHover = (color) => {
    const contrastText = theme.palette.getContrastText(color)
    switch (contrastText) {
      case "#fff":
        return "text-gray-100 hover:text-gray-200";

      case "rgba(0, 0, 0, 0.87)":
        return "text-gray-800 hover:text-gray-900";

      default:
        return "text-gray-800 hover:text-gray-900";
    }
  }


  return (
    <>
      {isLoaded && webAssetImport && (
        <div
          style={{
            backgroundColor: backgroundColor,
            minHeight: "390px",
          }}
        >
          {/* <h1>Dynamic Component Example</h1> */}

          <DynamicComponent
            // isBuiltIn
            // isPlugin
            // change DynamicComponent to WebAssetComponent
            // change filePath to import.
            filePath={webAssetImport}
            // filePath={"built-in/theme/category/name"}
            // filePath={"plugin/domain/theme/category/name"}
            props={componentProps}
          />
          {/* <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4">Welcome to My Tailwind CSS App</h1>
          <p className="text-gray-700">This is a simple layout using Tailwind CSS in a Next.js app.</p>
          </div>
        </div> */}

          {/* <DynamicComponent filePath={"../../../../components/_delete/MyComponent"} props={ComponentProps} /> */}
        </div>
      )}
    </>
  )

}

// export async function getServerSideProps(context) {
//   // Extract the cookie from the request footers
//   const cookies = parse(context.req.footers.cookie || '');

//   // Now `cookies` is an object containing key-value pairs of all cookies
//   const token = cookies.authToken;

//   console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', getSocketId())

//   const response = await callSubDomainApiMiddlewareWithToken({
//     token,
//     query: `
//     query($socketId: ID) {
//       backendSettingFooter_getOneRealTime(socketId: $socketId) {
//         entity
//         webAssetImport
//         menuJsonB
//         userAnswersJsonB
//         isReady {
//           order
//           name
//           booleanValue
//           user {
//             id
//             displayName
//             circleColor
//             labelColor
//             picture
//           }
//         }
//       }
//     }
//     `,
//     variables: {
//       socketId: getSocketId(),
//     }
//   })

//   const data = response.data.backendSettingFooter_getOneRealTime

//   return {
//     props: {
//       webAssetImport: data.webAssetImport,
//       data: {
//         user: JSON.parse(data.userAnswersJsonB),
//         system: {
//           state: {
//             isDisplayMode: false,
//             isFunctionalMode: true,
//             // isDayMode: //added later
//             // isNightMode //added later 
//           },
//           // socials
//         }
//       }
//     },
//   };
// }


PreviewFooterPage.getLayout = function getLayout(page) {
  return (
    <MainSiteLayout
      hasNoEntity
    >
      {page}
    </MainSiteLayout>
  )
}

export default PreviewFooterPage