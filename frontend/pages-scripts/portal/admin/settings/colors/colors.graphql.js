import { callSubDomainApi } from "@/utils/graphql/backend-api"

export const getSettingsColorsGraphQL = () => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      query {
        backendSetting_colors_getOne {
          color1
          color2
          color3
          color4
          color5
        }
      }
      `,
    })

    //clean up
    resolve(response?.data)
  })
}


export const postSettingsColorsGraphQL = ({ color1, color2, color3, color4, color5, lightTextColor, darkTextColor, darkBackgroundColor, lightBackgroundColor }) => {
  return new Promise(async (resolve) => {

    const response = await callSubDomainApi({
      query: `
      mutation($color1: String, $color2: String, $color3: String, $color4: String, $color5: String) {
        backendSetting_colors_updateOne(color1: $color1, color2: $color2, color3: $color3, color4: $color4, color5: $color5) {
          color1
          color2
          color3
          color4
          color5
        }
      }
      `,
      variables: { color1, color2, color3, color4, color5, lightTextColor, darkTextColor, darkBackgroundColor, lightBackgroundColor }
    })

    //clean up
    resolve(response?.data)
  })
}