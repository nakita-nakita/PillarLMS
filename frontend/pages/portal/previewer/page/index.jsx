// Library
import React, { useEffect, useState } from 'react'
import { parse } from 'cookie';

// mine
import MainSiteLayout from '@/layouts/mainSiteLayout/layout';
import { getSocketId, initSocket } from '@/utils/realtime/socket';
import { getSettingHeaderRealTimeGraphQL } from '@/pages-scripts/portal/admin/settings/pages/header/store/settingHeader_getRealTime.store';
import DynamicComponent from '@/components/previews/DynamicComponent/DynamicComponent.component'
import { callApiMiddlewareWithToken, callSubDomainApiMiddlewareWithToken } from '@/utils/graphql/backend-api.middleware';
import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { getSettingLoudSectionRealTimeGraphQL } from '@/pages-scripts/portal/previewer/loudSection/store/settingHeader_getRealTime.store';
import { getPageGraphQL } from '@/pages-scripts/portal/previewer/page/store/getPage.store';

const PreviewLoudSectionPage = (props) => {
  const theme = useTheme()
  const router = useRouter()

  const [isDayMode, setIsDayMode] = useState(true)
  const [backgroundColor, setBackgroundColor] = useState(theme.palette.grey[200])

  const [isLoaded, setIsLoaded] = useState(false)
  // const [componentProps, setComponentProps] = useState({})
  // const [webAssetImport, setWebAssetImport] = useState()

  const [loudSection, setLoudSection] = useState()
  const [normalSections, setNormalSections] = useState()

  const generateProps = ({ userAnswers, isDayMode }) => {
    return {
      data: {
        user: userAnswers,
        system: {
          state: {
            isDisplayMode: false,
            isFunctionalMode: true,
            isDevMode: true,
            isProdMode: false,
            isDayMode: isDayMode,
            isNightMode: !isDayMode,
          },
          // socials
        }
      }
    }
  }

  const initData = (isDayModeVar) => {
    console.log('router.query.pageId,', router.query.pageId)

    getPageGraphQL({
      pageId: router.query.pageId,
    }).then(response => {

      const loudSectionData = response.data.backendSiteDesignerPageSectionLoud_getOneByPageId
      const normalSectionData = response.data.backendSiteDesignerPageSectionNormal_getManyByPageId

      setLoudSection(loudSectionData)
      setNormalSections(normalSectionData)
      // setWebAssetImport(data.webAssetImport)
      // setEntity(data.entity)
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

    // socket.on('setting-header-change-prop', data => {

    //   console.log('setting-header-change-prop', data)
    //   if (data.name !== undefined && data.value !== undefined) {
    //     setComponentProps(prevState => {
    //       prevState.data.user[data.name] = data.value

    //       return { ...prevState }
    //     })
    //   }
    // })

    // socket.on("samedoc-header-selection-change", data => {
    //   setIsLoaded(false)
    //   initData()
    // })

    return () => {
      // socket.off('setting-header-change-prop')

      // socket.emit('server-samedoc-unsub-entity', { entity })

      // socket.off("samedoc-header-selection-change")
    }
  }, [])



  return (
    <>
      {isLoaded && (
        <div
          style={{
            backgroundColor: backgroundColor,
            minHeight: "390px",
          }}
        >
          {loudSection && (
            <DynamicComponent
              filePath={loudSection.webAssetImport}
              props={
                generateProps({
                  isDayMode,
                  userAnswers: loudSection.userAnswerJSONB
                    ? JSON.parse(loudSection.userAnswerJSONB)
                    : {},
                })
              }
            />
          )}
          {normalSections && normalSections.length > 0 && normalSections.map(n => (
            <DynamicComponent
              filePath={n.webAssetImport}
              props={
                generateProps({
                  isDayMode,
                  userAnswers: n.userAnswerJSONB
                    ? JSON.parse(n.userAnswerJSONB)
                    : {},
                })
              }
            />
          ))}
          {/* <h1>Dynamic Component Example</h1> */}

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
//   // Extract the cookie from the request headers
//   const cookies = parse(context.req.headers.cookie || '');

//   // Now `cookies` is an object containing key-value pairs of all cookies
//   const token = cookies.authToken;

//   console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', getSocketId())

//   const response = await callSubDomainApiMiddlewareWithToken({
//     token,
//     query: `
//     query($socketId: ID) {
//       backendSettingHeader_getOneRealTime(socketId: $socketId) {
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

//   const data = response.data.backendSettingHeader_getOneRealTime

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


PreviewLoudSectionPage.getLayout = function getLayout(page) {
  return (
    <MainSiteLayout
      hasNoEntity
    >
      {page}
    </MainSiteLayout>
  )
}

export default PreviewLoudSectionPage