import DynamicComponent from '@/components/previews/DynamicComponent/DynamicComponent.component'
// Library
import React from 'react'
import path from 'path'
import MainSiteLayout from '@/layouts/mainSiteLayout/layout';


// import asdf from '@/components/chip/user.avatar'

const PreviewHeaderPage = () => {

  // Example props JSON (propsJson)
  const propsJson = `{"name": "John", "age": 30}`;

  const ComponentProps = JSON.parse(propsJson)

  return (
    <div
      style={{
        backgroundColor: "#fff",
        minHeight: "390px",
      }}
    >
      {/* <h1>Dynamic Component Example</h1> */}
      <DynamicComponent
        // isBuiltIn
        // isPlugin
        // change DynamicComponent to WebAssetComponent
        // change filePath to import.
        filePath={"built-in/headers/simpleButtons"}
        // filePath={"built-in/theme/category/name"}
        // filePath={"plugin/domain/theme/category/name"}
        props={ComponentProps}
      />

      {/* <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md">
          <h1 className="text-2xl font-bold mb-4">Welcome to My Tailwind CSS App</h1>
          <p className="text-gray-700">This is a simple layout using Tailwind CSS in a Next.js app.</p>
        </div>
      </div> */}

      {/* <DynamicComponent filePath={"../../../../components/_delete/MyComponent"} props={ComponentProps} /> */}
    </div>
  )

}


PreviewHeaderPage.getLayout = function getLayout(page) {
  return (
    <MainSiteLayout
      hasNoEntity
    >
      {page}
    </MainSiteLayout>
  )
}

export default PreviewHeaderPage



// mainSiteLayout
// // <div className="min-h-screen flex items-center justify-center bg-gray-100">
// //   <div className="bg-white p-8 rounded shadow-md">
// //     <h1 className="text-2xl font-bold mb-4">Welcome to My Tailwind CSS App</h1>
// //     <p className="text-gray-700">This is a simple layout using Tailwind CSS in a Next.js app.</p>
// //   </div>
// // </div>