import gql from "graphql-tag"

const applicationType = gql`

  type SettingColorsType {
    color1: String,
    color2: String,
    color3: String,
    color4: String,
    color5: String,
    lightBackgroundColor: String,
    lightTextColor: String,
    darkBackgroundColor: String,
    darkTextColor: String
  }

  type Query {
    backendSetting_colors_getOne: SettingColorsType
  }
  type Mutation {
    backendSetting_colors_updateOne(color1: String, color2: String, color3: String, color4: String, color5: String, lightBackgroundColor: String, lightTextColor: String, darkBackgroundColor: String, darkTextColor: String): SettingColorsType
  }
`

export default applicationType