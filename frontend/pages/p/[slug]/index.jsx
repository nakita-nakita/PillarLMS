// Library
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// mine
import MainSiteLayout from '@/layouts/mainSiteLayout/layout';
import DynamicComponent from '@/components/previews/DynamicComponent/DynamicComponent.component';
import { useTheme } from '@mui/material';
import { getClientPageIdBySlugGraphQL } from '@/pages-scripts/p/store/getClientPageId.store';
import { callSubDomainApiMiddlewareWithToken } from '@/utils/graphql/backend-api.middleware';
import { getClientPageGraphQL } from '@/pages-scripts/p/store/getClientPage.store';

const createComponentProps = ({ organization, userAnswers, webAssetImport }) => {
  if (typeof (userAnswers) === "string") {
    userAnswers = JSON.parse(userAnswers)
  }

  return {
    webAssetImport,
    data: {
      user: userAnswers,
      system: {
        state: {
          isDisplayMode: false,
          isFunctionalMode: true,
          // isDayMode: //added later
          // isNightMode //added later 
        },
        // socials
      }

    },
  };
}

const Page = (props) => {
  const router = useRouter()
  const theme = useTheme()

  const [isLoaded, setIsLoaded] = useState(false)
  const [componentProps, setComponentProps] = useState({})
  const [webAssetImport, setWebAssetImport] = useState()
  const [backgroundColor, setBackgroundColor] = useState()

  useEffect(() => {
    const { webAssetImport: webAssetQueryParam, mode: modeQueryParam } = router.query;

    // Check if the query parameter is present before setting the state
    if (webAssetQueryParam) {
      setWebAssetImport(webAssetQueryParam.toString());

      switch (modeQueryParam.toString()) {
        case "night":
          setBackgroundColor(theme.palette.grey[800])
          break;
        case "day":
          setBackgroundColor(theme.palette.grey[200])
          break;

        default:
          setBackgroundColor(theme.palette.grey[800])
          break;
      }
    }

    if (modeQueryParam) {
      setComponentProps({
        props: {
          data: {
            system: {
              state: {
                isDisplayMode: true,
                isFunctionalMode: false,
                isDayMode: modeQueryParam.toString() === "day",
                isNightMode: modeQueryParam.toString() === "night",
              },
              // socials
            }
          }
        },
      })
    }

    setIsLoaded(true)



  }, [router.query]);

  return (
    <>
      {isLoaded && (
        <div
          style={{
            backgroundColor: backgroundColor,
            minHeight: "390px",
          }}
        >
          {props?.header?.webAssetImport && (
            <DynamicComponent
              filePath={props.header.webAssetImport}
              props={props.header}
            />
          )}

          {props?.loudSection?.webAssetImport && (
            <DynamicComponent
              filePath={props.loudSection.webAssetImport}
              props={props.loudSection}
            />
          )}

          {props?.sections && props?.sections.map(section => (
            <DynamicComponent
              filePath={section.webAssetImport}
              props={section}
            />
          )
          )}


          {props?.footer?.webAssetImport && (
            <DynamicComponent
              filePath={props.footer.webAssetImport}
              props={props.footer}
            />
          )}
        </div>
      )}
    </>
  );
};

export async function getServerSideProps(context) {

  const { slug } = context.params;
  const response = await getClientPageIdBySlugGraphQL({
    slug: `/p/${slug}`,
  })

  const pageId = response.clientSitePage_getOneBySlug.id

  const pageData = await getClientPageGraphQL({
    pageId,
  })

  return {
    props: {
      header: createComponentProps({
        webAssetImport: pageData.clientSiteHeader_getOne.webAssetImport,
        userAnswers: JSON.parse(pageData.clientSiteHeader_getOne?.userAnswersJsonB || "{}"),
      }),
      footer: createComponentProps({
        webAssetImport: pageData.clientSiteFooter_getOne.webAssetImport,
        userAnswers: JSON.parse(pageData.clientSiteFooter_getOne?.userAnswersJsonB || "{}"),
      }),
      loudSection: createComponentProps({
        webAssetImport: pageData.clientSitePageSectionLoud_getOneByPageId.webAssetImport,
        userAnswers: JSON.parse(pageData.clientSitePageSectionLoud_getOneByPageId?.userAnswersJsonB || "{}"),
      }),
      sections: pageData.clientSitePageSectionNormal_getManyByPageId.map(section => {
        return createComponentProps({
          webAssetImport: section.webAssetImport,
          userAnswers: JSON.parse(section?.userAnswersJsonB || "{}"),
        })
      })
    }
  }
}


Page.getLayout = function getLayout(page) {
  return (
    <MainSiteLayout
      hasNoEntity
    >
      {page}
    </MainSiteLayout>
  );
};

export default Page;
