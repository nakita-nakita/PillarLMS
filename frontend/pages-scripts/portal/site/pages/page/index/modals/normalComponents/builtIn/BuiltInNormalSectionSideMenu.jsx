import React, { useContext, useState } from 'react';
import RenderSiteSideMenuSelection from './RenderSiteSideMenuSelection';
import HeaderRow from '@/components/global/HeaderRow/HeaderRow.component';
import { SiteDesignerPageContext } from '../../../context/SiteDesignerPage.context';
// import RenderSiteSideMenuSelection from './RenderSiteSideMenuSelection';

const TextSections = () => {

  const {
    normalSectionBuiltIn,
  } = useContext(SiteDesignerPageContext)

  return (
    <>
      <HeaderRow label={"Text"} />
      {normalSectionBuiltIn && normalSectionBuiltIn.filter(b => b.category === "TEXT").map(site => <RenderSiteSideMenuSelection
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

const ImageSections = () => {
  const {
    normalSectionBuiltIn, setNormalSectionBuiltIn,
    normalSectionBuiltInSelected, setNormalSectionBuiltInSelected,

  } = useContext(SiteDesignerPageContext)


  return (
    <>
      <HeaderRow label={"Image"} />
      {normalSectionBuiltIn && normalSectionBuiltIn.filter(b => b.category === "IMAGE").map(site => <RenderSiteSideMenuSelection
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

const ListSections = () => {
  const {
    normalSectionBuiltIn, setNormalSectionBuiltIn,
    normalSectionBuiltInSelected, setNormalSectionBuiltInSelected,

  } = useContext(SiteDesignerPageContext)


  return (
    <>
      <HeaderRow label={"List"} />
      {normalSectionBuiltIn && normalSectionBuiltIn.filter(b => b.category === "LIST").map(site => <RenderSiteSideMenuSelection
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

const BuiltInNormalSectionSideMenu = ({ builtInSites, onComponentSelect }) => {

  const {
    isLoaded, setIsLoaded,
    //selected
    slug, setSlug,
  } = useContext(SiteDesignerPageContext)




  return (
    <div>
      {isLoaded && (
        <>
          <TextSections />
          <ImageSections />
          <ListSections />
        </>
      )}
    </div>
  );
};

export default BuiltInNormalSectionSideMenu
