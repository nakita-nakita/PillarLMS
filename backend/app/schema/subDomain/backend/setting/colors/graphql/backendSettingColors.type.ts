import gql from "graphql-tag"

const applicationType = gql`

  type SettingColorsType {    
    id: String
    color1: String
    color1Light1: String
    color1Light2: String
    color1Light3: String
    color1Light4: String
    color1Dark1: String
    color1Dark2: String
    color1Dark3: String
    color1Dark4: String
    color2: String
    color2Light1: String
    color2Light2: String
    color2Light3: String
    color2Light4: String
    color2Dark1: String
    color2Dark2: String
    color2Dark3: String
    color2Dark4: String
    color3: String
    color3Light1: String
    color3Light2: String
    color3Light3: String
    color3Light4: String
    color3Dark1: String
    color3Dark2: String
    color3Dark3: String
    color3Dark4: String
    color4: String
    color4Light1: String
    color4Light2: String
    color4Light3: String
    color4Light4: String
    color4Dark1: String
    color4Dark2: String
    color4Dark3: String
    color4Dark4: String
    color5: String
    color5Light1: String
    color5Light2: String
    color5Light3: String
    color5Light4: String
    color5Dark1: String
    color5Dark2: String
    color5Dark3: String
    color5Dark4: String
    color6: String
    color6Light1: String
    color6Light2: String
    color6Light3: String
    color6Light4: String
    color6Dark1: String
    color6Dark2: String
    color6Dark3: String
    color6Dark4: String
    color7: String
    color7Light1: String
    color7Light2: String
    color7Light3: String
    color7Light4: String
    color7Dark1: String
    color7Dark2: String
    color7Dark3: String
    color7Dark4: String
    isReady: Boolean
  }

  type SettingColorsRealTimeType {    
    id: String
    entity: String
    color1: RealTimeColorPicker
    color2: RealTimeColorPicker
    color3: RealTimeColorPicker
    color4: RealTimeColorPicker
    color5: RealTimeColorPicker
    color6: RealTimeColorPicker
    color7: RealTimeColorPicker
    isReady: RealTimeSwitch
  }

  type Query {
    backendSettingColors_getOne: SettingColorsType
    backendSettingColors_getOneRealTime(socketId: ID!): SettingColorsRealTimeType
  }

  type Mutation {
    backendSettingColors_upsertOne(
      id: ID,
      color1: String,
      color1Light1: String,
      color1Light2: String,
      color1Light3: String,
      color1Light4: String,
      color1Dark1: String,
      color1Dark2: String,
      color1Dark3: String,
      color1Dark4: String,
      color2: String,
      color2Light1: String,
      color2Light2: String,
      color2Light3: String,
      color2Light4: String,
      color2Dark1: String,
      color2Dark2: String,
      color2Dark3: String,
      color2Dark4: String,
      color3: String,
      color3Light1: String,
      color3Light2: String,
      color3Light3: String,
      color3Light4: String,
      color3Dark1: String,
      color3Dark2: String,
      color3Dark3: String,
      color3Dark4: String,
      color4: String,
      color4Light1: String,
      color4Light2: String,
      color4Light3: String,
      color4Light4: String,
      color4Dark1: String,
      color4Dark2: String,
      color4Dark3: String,
      color4Dark4: String,
      color5: String,
      color5Light1: String,
      color5Light2: String,
      color5Light3: String,
      color5Light4: String,
      color5Dark1: String,
      color5Dark2: String,
      color5Dark3: String,
      color5Dark4: String,
      color6: String,
      color6Light1: String,
      color6Light2: String,
      color6Light3: String,
      color6Light4: String,
      color6Dark1: String,
      color6Dark2: String,
      color6Dark3: String,
      color6Dark4: String,
      color7: String,
      color7Light1: String,
      color7Light2: String,
      color7Light3: String,
      color7Light4: String,
      color7Dark1: String,
      color7Dark2: String,
      color7Dark3: String,
      color7Dark4: String,
      isReady: Boolean
      ): SettingColorsType
  }
`

export default applicationType