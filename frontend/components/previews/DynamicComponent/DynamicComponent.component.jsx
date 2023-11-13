import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const getDynamicComponent = async (c) => {
  const component = dynamic(() => import(`@/web-assets/${c}`), {
    loading: () => <p>Loading...</p>,
  })

  console.log('component', component)

  return component
}

const DynamicComponent = ({ filePath, props }) => {
  const [DynamicComponentRender, setDynamicComponentRender] = useState(null);

  useEffect(() => {

    if (typeof window !== 'undefined') {
      // Conditionally load the DynamicComponent in useEffect
      if (filePath) {
        getDynamicComponent(filePath).then(result => {
          const DynamicComponentImport = result
          
          setDynamicComponentRender(DynamicComponentImport);
        })
      }
    }
  }, [filePath]);

  return (
    <div>
      {DynamicComponentRender && <DynamicComponentRender {...props} />}
    </div>
  );
};

export default DynamicComponent;
