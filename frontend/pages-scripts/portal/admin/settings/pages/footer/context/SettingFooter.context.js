// Libraries
import React, { useContext, useEffect, useState } from 'react'
import { getSocketId } from '@/utils/realtime/socket';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import { getSettingFooterBuiltInGraphQL } from '../store/settingFooterBuiltIn_getMany.store';
import { getSettingFooterRealTimeGraphQL } from '../store/settingFooter_getRealTime.store';

export const SettingFooterContext = React.createContext();

export function SettingFooterProvider({ children }) {
  const { updateEntity } = useContext(AdminLayoutContext)

  const [isLoaded, setIsLoaded] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // selected
  const [id, setId] = useState()
  const [entity, setEntity] = useState()
  const [webAssetImport, setWebAssetImport] = useState()
  const [menu, setMenu] = useState()
  const [userAnswers, setUserAnswers] = useState()
  const [userAnswersValue, setUserAnswersValue] = useState()
  const [isReady, setIsReady] = useState()
  const [isReadyValue, setIsReadyValue] = useState()

  // selections
  const [isSelectionModalOpened, setIsSelectionModalOpened] = useState(false)

  const [builtInData, setBuiltInData] = useState([])
  const [builtInDataSelected, setBuiltInDataSelected] = useState({})

  const selectComponent = ({ id }) => {
    const data = builtInData.filter((component) => component.id === id)[0];
    setBuiltInDataSelected({ ...data })
  }

  const getNextComponent = () => {
    const index = builtInData.findIndex((component) => component.id === builtInDataSelected.id);

    if (index !== -1 && index < builtInData.length - 1) {
      return builtInData[index + 1];
    }

    return builtInData[0];
  };

  const getPreviousComponent = () => {
    const index = builtInData.findIndex((component) => component.id === builtInDataSelected.id);

    if (index !== -1 && index > 0) {
      return builtInData[index - 1];
    }

    return builtInData[builtInData.length - 1]; // Return the last component if the component with the given ID is not found or if it's the first component
  };



  useEffect(() => {
    getSettingFooterBuiltInGraphQL().then(response => {
      const data = response.data.backendSettingFooterBuiltIn_getMany
      setBuiltInData(data)
    })

  }, [])

  useEffect(() => {
    if (builtInData[0]) {

      selectComponent({
        id: builtInData[0].id
      })

    }
  }, [builtInData])

  useEffect(() => {
    getSettingFooterRealTimeGraphQL({
      socketId: getSocketId()
    }).then(response => {

      const data = response.data.backendSettingFooter_getOneRealTime

      updateEntity({
        entity: data.entity
      })

      setId(data.id)
      setEntity(data.entity)
      setWebAssetImport(data.webAssetImport)
      setMenu(JSON.parse(data.menuJsonB))
      setUserAnswers(JSON.parse(data.userAnswersJsonB))
      setIsReady(data.isReady)

      setIsLoaded(true)
    })
  }, [])


  return (
    <SettingFooterContext.Provider value={{
      isLoaded, setIsLoaded,
      isDarkMode, setIsDarkMode,
      //selected
      id, setId,
      entity, setEntity,
      webAssetImport, setWebAssetImport,
      menu, setMenu,
      userAnswers, setUserAnswers,
      userAnswersValue, setUserAnswersValue,
      isReady, setIsReady,
      isReadyValue, setIsReadyValue,

      //selections
      isSelectionModalOpened, setIsSelectionModalOpened,
      builtInData, setBuiltInData,
      builtInDataSelected, setBuiltInDataSelected,

      // helper functions
      selectComponent,
      getNextComponent,
      getPreviousComponent,

    }}>
      {children}
    </SettingFooterContext.Provider>
  )
}

export default SettingFooterProvider