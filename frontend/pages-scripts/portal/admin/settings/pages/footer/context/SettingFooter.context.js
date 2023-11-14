// Libraries
import React, { useContext, useEffect, useState } from 'react'
import { getSocketId } from '@/utils/realtime/socket';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { getSettingFooterBuiltInGraphQL } from '../store/settingFooterBuiltIn_getMany.store';

export const SettingFooterContext = React.createContext();

export function SettingFooterProvider({ children }) {
  const { updateEntity } = useContext(AdminLayoutContext)

  const [isLoaded, setLoaded] = useState(false)

  const [id, setId] = useState()
  const [entity, setEntity] = useState()

  const [isSelectionModalOpened, setIsSelectionModalOpened] = useState(false)

  const [builtInData, setBuiltInData] = useState([])
  const [builtInDataSelected, setBuiltInDataSelected] = useState({})
  const [builtInMenuData, setBuiltInMenuData] = useState([])
  const [builtInMenuDataFlat, setBuiltInDataFlat] = useState([])

  const createMenuData = (data) => {
    const transformedData = [];

    // Create a map to group components by theme and category
    const componentMap = new Map();

    data.forEach((component) => {
      const { theme, category, ...rest } = component;
      const themeKey = theme || 'Default';
      const categoryKey = category || 'Uncategorized';

      if (!componentMap.has(themeKey)) {
        componentMap.set(themeKey, new Map());
      }

      if (!componentMap.get(themeKey).has(categoryKey)) {
        componentMap.get(themeKey).set(categoryKey, []);
      }

      componentMap.get(themeKey).get(categoryKey).push({ ...rest });
    });

    // Convert the map to the desired array structure
    componentMap.forEach((categories, theme) => {
      const themeObject = { label: theme, category: [] };

      categories.forEach((components, category) => {
        const categoryObject = { label: category, components: [...components] };
        themeObject.category.push(categoryObject);
      });

      transformedData.push(themeObject);
    });

    return transformedData;
  }

  const flattenMenuData = (data) => {
    let returnArray = []

    for (let i = 0; i < data.length; i++) {
      const { category } = data[i]
      for (let y = 0; y < category.length; y++) {
        const { components } = category[y];

        for (let x = 0; x < components.length; x++) {
          const component = components[x];
          
          returnArray.push(component)
        }
      }
    }

    return returnArray
  }

  const selectComponent = ({ id }) => {
    const data = builtInData.filter((component) => component.id === id)[0];
    console.log('builtInData[index]', builtInData, data)
    setBuiltInDataSelected({ ...data })
  }

  const getNextComponent = () => {
    const index = builtInMenuDataFlat.findIndex((component) => component.id === builtInDataSelected.id);

    if (index !== -1 && index < builtInMenuDataFlat.length - 1) {
      return builtInMenuDataFlat[index + 1];
    }

    return builtInMenuDataFlat[0];
  };

  const getPreviousComponent = () => {
    const index = builtInMenuDataFlat.findIndex((component) => component.id === builtInDataSelected.id);

    if (index !== -1 && index > 0) {
      return builtInMenuDataFlat[index - 1];
    }

    return builtInMenuDataFlat[builtInMenuDataFlat.length - 1]; // Return the last component if the component with the given ID is not found or if it's the first component
  };



  useEffect(() => {
    getSettingFooterBuiltInGraphQL().then(response => {
      const data = response.data.backendSettingFooterBuiltIn_getMany
      
      setBuiltInData(data)
      
      const menuData = createMenuData([...data])
      setBuiltInMenuData(menuData)
      
      const flatten = flattenMenuData(menuData)
      
      // setBuiltInDataFlat
      setBuiltInDataFlat(flatten)

    })    
  }, [])

  useEffect(() => {
    if (builtInMenuData[0]) {
      
      selectComponent({
        id: builtInMenuDataFlat[0].id
      })

    }
  }, [builtInMenuData])


  // useEffect(() => {
  //   const socketId = getSocketId()
  //   getSettingFooterGraphQL({
  //     socketId,
  //   }).then(result => {
  //     const link = result.data.backendSettingFooter_getOneRealTime

  //     console.log('link data:', link)
  //     updateEntity({
  //       entity: link.entity
  //     })
  //     setId(link.id)
  //     setEntity(link.entity)
  //     setTitle(link.title)
  //     setDescription(link.description)
  //     setImage(link.image)
  //     setCurrentImage(link.image?.currentSelection?.picture)
  //     setIsReady(link.isReady)
  //     setLoaded(true)
  //   })

  // }, [])

  return (
    <SettingFooterContext.Provider value={{
      isLoaded, setLoaded,
      id, setId,
      entity, setEntity,
      isSelectionModalOpened, setIsSelectionModalOpened,
      builtInData, setBuiltInData,
      builtInDataSelected, setBuiltInDataSelected,
      builtInMenuData, setBuiltInMenuData,
      builtInMenuDataFlat, setBuiltInDataFlat,

      selectComponent,
      getNextComponent,
      getPreviousComponent,
    }}>
      {children}
    </SettingFooterContext.Provider>
  )
}

export default SettingFooterProvider