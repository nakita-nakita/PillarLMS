import React, { useContext, useState } from 'react';
import RenderSiteSideMenuSelection from './RenderSiteSideMenuSelection';
import HeaderRow from '@/components/global/HeaderRow/HeaderRow.component';
import { SiteDesignerPageContext } from '../../../context/SiteDesignerPage.context';
// import RenderSiteSideMenuSelection from './RenderSiteSideMenuSelection';

const LoudNormalPageSections = () => {

  const {
    loudSectionBuiltIn,
  } = useContext(SiteDesignerPageContext)

  return (
    <>
      <HeaderRow label={"Normal Page"} />
      {loudSectionBuiltIn && loudSectionBuiltIn.filter(b => b.category === "NORMALPAGE").map(site => <RenderSiteSideMenuSelection
        site={site}
        onComponentSelect={(selection) => {

          if (onComponentSelect) {
            onComponentSelect(selection)
          }
        }}
      />)}
    </>
  )
}

const LoudHomepageSections = () => {
  const {
    loudSectionBuiltIn, setLoudSectionBuiltIn,
    loudSectionBuiltInSelected, setLoudSectionBuiltInSelected,

  } = useContext(SiteDesignerPageContext)


  return (
    <>
      <HeaderRow label={"Homepage"} />
      {loudSectionBuiltIn && loudSectionBuiltIn.filter(b => b.category === "HOMEPAGE").map(site => <RenderSiteSideMenuSelection
        site={site}
        onComponentSelect={(selection) => {

          if (onComponentSelect) {
            onComponentSelect(selection)
          }
        }}
      />)}
    </>
  )
}

const BuiltInLoudSectionSideMenu = ({ builtInSites, onComponentSelect }) => {

  const {
    isLoaded, setIsLoaded,
    //selected
    slug, setSlug,
  } = useContext(SiteDesignerPageContext)




  return (
    <div>
      {isLoaded && (
        <>
          {slug === "/" && (
            <>
              <LoudHomepageSections />
              <LoudNormalPageSections />
            </>
          )}
          {slug !== "/" && (
            <>
              <LoudNormalPageSections />
              <LoudHomepageSections />
            </>
          )}

          <br />
          <br />
          <br />

        </>
      )}
    </div>
  );
};

export default BuiltInLoudSectionSideMenu
