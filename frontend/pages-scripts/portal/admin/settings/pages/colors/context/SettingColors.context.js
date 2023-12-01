// Libraries
import React, { useContext, useEffect, useState } from 'react'
import { getSocketId, initSocket } from '@/utils/realtime/socket';
import AdminLayoutContext from '@/layouts/admin/layout/adminLayout.context';
import chroma from 'chroma-js';
import { getSettingColorsGraphQL } from '../store/settingColors_getOneRealTime.store';

export const SettingColorsContext = React.createContext();

export function SettingColorsProvider({ children }) {
  const { updateEntity, idChip } = useContext(AdminLayoutContext)

  const [isLoaded, setLoaded] = useState(false)

  const [modals, setModals] = useState({
    isColorPaletteModalOpened: false,
  })

  const [id, setId] = useState()
  const [entity, setEntity] = useState()

  const [color1, setColor1] = useState()
  const [color1User, setColor1User] = useState()
  const [color1Light1, setColor1Light1] = useState()
  const [color1Light2, setColor1Light2] = useState()
  const [color1Light3, setColor1Light3] = useState()
  const [color1Light4, setColor1Light4] = useState()
  const [color1Dark1, setColor1Dark1] = useState()
  const [color1Dark2, setColor1Dark2] = useState()
  const [color1Dark3, setColor1Dark3] = useState()
  const [color1Dark4, setColor1Dark4] = useState()
  const [color2, setColor2] = useState()
  const [color2User, setColor2User] = useState()
  const [color2Light1, setColor2Light1] = useState()
  const [color2Light2, setColor2Light2] = useState()
  const [color2Light3, setColor2Light3] = useState()
  const [color2Light4, setColor2Light4] = useState()
  const [color2Dark1, setColor2Dark1] = useState()
  const [color2Dark2, setColor2Dark2] = useState()
  const [color2Dark3, setColor2Dark3] = useState()
  const [color2Dark4, setColor2Dark4] = useState()
  const [color3, setColor3] = useState()
  const [color3User, setColor3User] = useState()
  const [color3Light1, setColor3Light1] = useState()
  const [color3Light2, setColor3Light2] = useState()
  const [color3Light3, setColor3Light3] = useState()
  const [color3Light4, setColor3Light4] = useState()
  const [color3Dark1, setColor3Dark1] = useState()
  const [color3Dark2, setColor3Dark2] = useState()
  const [color3Dark3, setColor3Dark3] = useState()
  const [color3Dark4, setColor3Dark4] = useState()
  const [color4, setColor4] = useState()
  const [color4User, setColor4User] = useState()
  const [color4Light1, setColor4Light1] = useState()
  const [color4Light2, setColor4Light2] = useState()
  const [color4Light3, setColor4Light3] = useState()
  const [color4Light4, setColor4Light4] = useState()
  const [color4Dark1, setColor4Dark1] = useState()
  const [color4Dark2, setColor4Dark2] = useState()
  const [color4Dark3, setColor4Dark3] = useState()
  const [color4Dark4, setColor4Dark4] = useState()
  const [color5, setColor5] = useState()
  const [color5User, setColor5User] = useState()
  const [color5Light1, setColor5Light1] = useState()
  const [color5Light2, setColor5Light2] = useState()
  const [color5Light3, setColor5Light3] = useState()
  const [color5Light4, setColor5Light4] = useState()
  const [color5Dark1, setColor5Dark1] = useState()
  const [color5Dark2, setColor5Dark2] = useState()
  const [color5Dark3, setColor5Dark3] = useState()
  const [color5Dark4, setColor5Dark4] = useState()
  const [color6, setColor6] = useState()
  const [color6User, setColor6User] = useState()
  const [color6Light1, setColor6Light1] = useState()
  const [color6Light2, setColor6Light2] = useState()
  const [color6Light3, setColor6Light3] = useState()
  const [color6Light4, setColor6Light4] = useState()
  const [color6Dark1, setColor6Dark1] = useState()
  const [color6Dark2, setColor6Dark2] = useState()
  const [color6Dark3, setColor6Dark3] = useState()
  const [color6Dark4, setColor6Dark4] = useState()
  const [color7, setColor7] = useState()
  const [color7User, setColor7User] = useState()
  const [color7Light1, setColor7Light1] = useState()
  const [color7Light2, setColor7Light2] = useState()
  const [color7Light3, setColor7Light3] = useState()
  const [color7Light4, setColor7Light4] = useState()
  const [color7Dark1, setColor7Dark1] = useState()
  const [color7Dark2, setColor7Dark2] = useState()
  const [color7Dark3, setColor7Dark3] = useState()
  const [color7Dark4, setColor7Dark4] = useState()

  const [isReady, setIsReady] = useState()
  const [isReadyValue, setIsReadyValue] = useState()


  useEffect(() => {
    const socketId = getSocketId()
    getSettingColorsGraphQL({
      socketId,
    }).then(result => {
      const colors = result.data.backendSettingColors_getOneRealTime

      if (colors) {

        updateEntity({
          entity: colors.entity
        })
        setEntity(colors.entity)

        setId(colors.id)
        setIsReady(colors.isReady)

        setColor1(colors.color1.color || "rgb(255, 255, 255)")
        setColor1User(colors.color1.user)
        setColor1Light1(colors.color1.colorLight1 || "rgb(255, 255, 255)")
        setColor1Light2(colors.color1.colorLight2 || "rgb(255, 255, 255)")
        setColor1Light3(colors.color1.colorLight3 || "rgb(255, 255, 255)")
        setColor1Light4(colors.color1.colorLight4 || "rgb(255, 255, 255)")
        setColor1Dark1(colors.color1.colorDark1 || "rgb(255, 255, 255)")
        setColor1Dark2(colors.color1.colorDark2 || "rgb(255, 255, 255)")
        setColor1Dark3(colors.color1.colorDark3 || "rgb(255, 255, 255)")
        setColor1Dark4(colors.color1.colorDark4 || "rgb(255, 255, 255)")

        setColor2(colors.color2.color || "rgb(255, 255, 255)")
        setColor2User(colors.color2.user)
        setColor2Light1(colors.color2.colorLight1 || "rgb(255, 255, 255)")
        setColor2Light2(colors.color2.colorLight2 || "rgb(255, 255, 255)")
        setColor2Light3(colors.color2.colorLight3 || "rgb(255, 255, 255)")
        setColor2Light4(colors.color2.colorLight4 || "rgb(255, 255, 255)")
        setColor2Dark1(colors.color2.colorDark1 || "rgb(255, 255, 255)")
        setColor2Dark2(colors.color2.colorDark2 || "rgb(255, 255, 255)")
        setColor2Dark3(colors.color2.colorDark3 || "rgb(255, 255, 255)")
        setColor2Dark4(colors.color2.colorDark4 || "rgb(255, 255, 255)")

        setColor3(colors.color3.color || "rgb(255, 255, 255)")
        setColor3User(colors.color3.user)
        setColor3Light1(colors.color3.colorLight1 || "rgb(255, 255, 255)")
        setColor3Light2(colors.color3.colorLight2 || "rgb(255, 255, 255)")
        setColor3Light3(colors.color3.colorLight3 || "rgb(255, 255, 255)")
        setColor3Light4(colors.color3.colorLight4 || "rgb(255, 255, 255)")
        setColor3Dark1(colors.color3.colorDark1 || "rgb(255, 255, 255)")
        setColor3Dark2(colors.color3.colorDark2 || "rgb(255, 255, 255)")
        setColor3Dark3(colors.color3.colorDark3 || "rgb(255, 255, 255)")
        setColor3Dark4(colors.color3.colorDark4 || "rgb(255, 255, 255)")

        setColor4(colors.color4.color || "rgb(255, 255, 255)")
        setColor4User(colors.color4.user)
        setColor4Light1(colors.color4.colorLight1 || "rgb(255, 255, 255)")
        setColor4Light2(colors.color4.colorLight2 || "rgb(255, 255, 255)")
        setColor4Light3(colors.color4.colorLight3 || "rgb(255, 255, 255)")
        setColor4Light4(colors.color4.colorLight4 || "rgb(255, 255, 255)")
        setColor4Dark1(colors.color4.colorDark1 || "rgb(255, 255, 255)")
        setColor4Dark2(colors.color4.colorDark2 || "rgb(255, 255, 255)")
        setColor4Dark3(colors.color4.colorDark3 || "rgb(255, 255, 255)")
        setColor4Dark4(colors.color4.colorDark4 || "rgb(255, 255, 255)")

        setColor5(colors.color5.color || "rgb(255, 255, 255)")
        setColor5User(colors.color5.user)
        setColor5Light1(colors.color5.colorLight1 || "rgb(255, 255, 255)")
        setColor5Light2(colors.color5.colorLight2 || "rgb(255, 255, 255)")
        setColor5Light3(colors.color5.colorLight3 || "rgb(255, 255, 255)")
        setColor5Light4(colors.color5.colorLight4 || "rgb(255, 255, 255)")
        setColor5Dark1(colors.color5.colorDark1 || "rgb(255, 255, 255)")
        setColor5Dark2(colors.color5.colorDark2 || "rgb(255, 255, 255)")
        setColor5Dark3(colors.color5.colorDark3 || "rgb(255, 255, 255)")
        setColor5Dark4(colors.color5.colorDark4 || "rgb(255, 255, 255)")

        setColor6(colors.color6.color || "rgb(255, 255, 255)")
        setColor6User(colors.color6.user)
        setColor6Light1(colors.color6.colorLight1 || "rgb(255, 255, 255)")
        setColor6Light2(colors.color6.colorLight2 || "rgb(255, 255, 255)")
        setColor6Light3(colors.color6.colorLight3 || "rgb(255, 255, 255)")
        setColor6Light4(colors.color6.colorLight4 || "rgb(255, 255, 255)")
        setColor6Dark1(colors.color6.colorDark1 || "rgb(255, 255, 255)")
        setColor6Dark2(colors.color6.colorDark2 || "rgb(255, 255, 255)")
        setColor6Dark3(colors.color6.colorDark3 || "rgb(255, 255, 255)")
        setColor6Dark4(colors.color6.colorDark4 || "rgb(255, 255, 255)")

        setColor7(colors.color7.color || "rgb(255, 255, 255)")
        setColor7User(colors.color7.user)
        setColor7Light1(colors.color7.colorLight1 || "rgb(255, 255, 255)")
        setColor7Light2(colors.color7.colorLight2 || "rgb(255, 255, 255)")
        setColor7Light3(colors.color7.colorLight3 || "rgb(255, 255, 255)")
        setColor7Light4(colors.color7.colorLight4 || "rgb(255, 255, 255)")
        setColor7Dark1(colors.color7.colorDark1 || "rgb(255, 255, 255)")
        setColor7Dark2(colors.color7.colorDark2 || "rgb(255, 255, 255)")
        setColor7Dark3(colors.color7.colorDark3 || "rgb(255, 255, 255)")
        setColor7Dark4(colors.color7.colorDark4 || "rgb(255, 255, 255)")

        // setColor1(colors.color1.color) 
      }

      setLoaded(true)
    })

    const socket = initSocket();

    socket.on('samedoc-color-change', result => {
      switch (result.name) {
        case "color1":
          updateColor1(result.color, result.user)
          break;
        case "color2":
          updateColor2(result.color, result.user)
          break;
        case "color3":
          updateColor3(result.color, result.user)
          break;
        case "color4":
          updateColor4(result.color, result.user)
          break;
        case "color5":
          updateColor5(result.color, result.user)
          break;
        case "color6":
          updateColor6(result.color, result.user)
          break;
        case "color7":
          updateColor7(result.color, result.user)
          break;
      }
    })

    return () => {
      socket.off('samedoc-color-change')
    }

  }, [])

  const sendServerUpdate = ({ color, name }) => {
    //socket
    const socket = initSocket()

    socket.emit('server-samedoc-color-picker-change', {
      entity,
      name,
      color,
    })
  }

  const updateColor1 = (color, user) => {
    if (color) {
      // get 4 shades light from color
      setColor1Light1(chroma(color).brighten(2).hex());
      setColor1Light2(chroma(color).brighten(1.5).hex());
      setColor1Light3(chroma(color).brighten(1).hex());
      setColor1Light4(chroma(color).brighten(0.5).hex());

      // get 4 shades dark from color
      setColor1Dark1(chroma(color).darken(0.5).hex());
      setColor1Dark2(chroma(color).darken(2).hex());
      setColor1Dark3(chroma(color).darken(1.5).hex());
      setColor1Dark4(chroma(color).darken(2).hex());


      // set Color
      setColor1(color)

      //socket
      sendServerUpdate({
        color,
        name: "color1"
      })
    }

    // set User Chip
    if (user) {
      setColor1User(user)
    } else {
      setColor1User({ ...idChip })
    }
  }

  const updateColor2 = (color, user) => {
    if (color) {
      // get 4 shades light from color
      setColor2Light1(chroma(color).brighten(2).hex());
      setColor2Light2(chroma(color).brighten(1.5).hex());
      setColor2Light3(chroma(color).brighten(1).hex());
      setColor2Light4(chroma(color).brighten(0.5).hex());

      // get 4 shades dark from color
      setColor2Dark1(chroma(color).darken(0.5).hex());
      setColor2Dark2(chroma(color).darken(1).hex());
      setColor2Dark3(chroma(color).darken(1.5).hex());
      setColor2Dark4(chroma(color).darken(2).hex());


      // set Color
      setColor2(color)

      //socket
      sendServerUpdate({
        color,
        name: "color2"
      })

      // set User Chip
      if (user) {
        setColor2User(user)
      } else {
        setColor2User({ ...idChip })
      }
    }
  }

  const updateColor3 = (color, user) => {
    if (color) {
      // get 4 shades light from color
      setColor3Light1(chroma(color).brighten(2).hex());
      setColor3Light2(chroma(color).brighten(1.5).hex());
      setColor3Light3(chroma(color).brighten(1).hex());
      setColor3Light4(chroma(color).brighten(0.5).hex());

      // get 4 shades dark from color
      setColor3Dark1(chroma(color).darken(0.5).hex());
      setColor3Dark2(chroma(color).darken(1).hex());
      setColor3Dark3(chroma(color).darken(1.5).hex());
      setColor3Dark4(chroma(color).darken(2).hex());


      // set Color
      setColor3(color)

      //socket
      sendServerUpdate({
        color,
        name: "color3"
      })
    }

    // set User Chip
    if (user) {
      setColor3User(user)
    } else {
      setColor3User({ ...idChip })
    }
  }

  const updateColor4 = (color, user) => {
    if (color) {
      // get 4 shades light from color
      setColor4Light1(chroma(color).brighten(2).hex());
      setColor4Light2(chroma(color).brighten(1.5).hex());
      setColor4Light3(chroma(color).brighten(1).hex());
      setColor4Light4(chroma(color).brighten(0.5).hex());

      // get 4 shades dark from color
      setColor4Dark1(chroma(color).darken(0.5).hex());
      setColor4Dark2(chroma(color).darken(1).hex());
      setColor4Dark3(chroma(color).darken(1.5).hex());
      setColor4Dark4(chroma(color).darken(2).hex());


      // set Color
      setColor4(color)

      //socket
      sendServerUpdate({
        color,
        name: "color4"
      })
    }

    // set User Chip
    if (user) {
      setColor4User(user)
    } else {
      setColor4User({ ...idChip })
    }
  }

  const updateColor5 = (color, user) => {
    if (color) {
      // get 4 shades light from color
      setColor5Light1(chroma(color).brighten(2).hex());
      setColor5Light2(chroma(color).brighten(1.5).hex());
      setColor5Light3(chroma(color).brighten(1).hex());
      setColor5Light4(chroma(color).brighten(0.5).hex());

      // get 4 shades dark from color
      setColor5Dark1(chroma(color).darken(0.5).hex());
      setColor5Dark2(chroma(color).darken(1).hex());
      setColor5Dark3(chroma(color).darken(1.5).hex());
      setColor5Dark4(chroma(color).darken(2).hex());


      // set Color
      setColor5(color)

      //socket
      sendServerUpdate({
        color,
        name: "color5"
      })
    }

    // set User Chip
    if (user) {
      setColor5User(user)
    } else {
      setColor5User({ ...idChip })
    }
  }

  const updateColor6 = (color, user) => {
    if (color) {
      // get 4 shades light from color
      setColor6Light1(chroma(color).brighten(2).hex());
      setColor6Light2(chroma(color).brighten(1.5).hex());
      setColor6Light3(chroma(color).brighten(1).hex());
      setColor6Light4(chroma(color).brighten(0.5).hex());

      // get 4 shades dark from color
      setColor6Dark1(chroma(color).darken(0.5).hex());
      setColor6Dark2(chroma(color).darken(1).hex());
      setColor6Dark3(chroma(color).darken(1.5).hex());
      setColor6Dark4(chroma(color).darken(2).hex());

      // set Color
      setColor6(color)

      //socket
      sendServerUpdate({
        color,
        name: "color6"
      })
    }

    // set User Chip
    if (user) {
      setColor6User(user)
    } else {
      setColor6User({ ...idChip })
    }
  }

  const updateColor7 = (color, user) => {
    if (color) {
      // get 4 shades light from color
      setColor7Light1(chroma(color).brighten(2).hex());
      setColor7Light2(chroma(color).brighten(1.5).hex());
      setColor7Light3(chroma(color).brighten(1).hex());
      setColor7Light4(chroma(color).brighten(0.5).hex());

      // get 4 shades dark from color
      setColor7Dark1(chroma(color).darken(0.5).hex());
      setColor7Dark2(chroma(color).darken(1).hex());
      setColor7Dark3(chroma(color).darken(1.5).hex());
      setColor7Dark4(chroma(color).darken(2).hex());

      // set Color
      setColor7(color)

      //socket
      sendServerUpdate({
        color,
        name: "color7"
      })
    }

    // set User Chip
    if (user) {
      setColor7User(user)
    } else {
      setColor7User({ ...idChip })
    }
  }

  return (
    <SettingColorsContext.Provider value={{
      isLoaded, setLoaded,
      id, setId,
      entity, setEntity,
      color1, updateColor1,
      color1User, setColor1User,
      color2, updateColor2,
      color2User, setColor2User,
      color3, updateColor3,
      color3User, setColor3User,
      color4, updateColor4,
      color4User, setColor4User,
      color5, updateColor5,
      color5User, setColor5User,
      color6, updateColor6,
      color6User, setColor6User,
      color7, updateColor7,
      color7User, setColor7User,
      isReady, setIsReady,
      isReadyValue, setIsReadyValue,

      color1Light1,
      color1Light2,
      color1Light3,
      color1Light4,
      color1Dark1,
      color1Dark2,
      color1Dark3,
      color1Dark4,

      color2Light1,
      color2Light2,
      color2Light3,
      color2Light4,
      color2Dark1,
      color2Dark2,
      color2Dark3,
      color2Dark4,

      color3Light1,
      color3Light2,
      color3Light3,
      color3Light4,
      color3Dark1,
      color3Dark2,
      color3Dark3,
      color3Dark4,

      color4Light1,
      color4Light2,
      color4Light3,
      color4Light4,
      color4Dark1,
      color4Dark2,
      color4Dark3,
      color4Dark4,

      color5Light1,
      color5Light2,
      color5Light3,
      color5Light4,
      color5Dark1,
      color5Dark2,
      color5Dark3,
      color5Dark4,

      color6Light1,
      color6Light2,
      color6Light3,
      color6Light4,
      color6Dark1,
      color6Dark2,
      color6Dark3,
      color6Dark4,

      color7Light1,
      color7Light2,
      color7Light3,
      color7Light4,
      color7Dark1,
      color7Dark2,
      color7Dark3,
      color7Dark4,

      modals, setModals,
    }}>
      {children}
    </SettingColorsContext.Provider>
  )
}

export default SettingColorsProvider