import { callApi } from "@/utils/graphql/backend-api"

export const getProfileGraphQL = () => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
      query {
        foundationUserProfile_getOne {
          firstName
          lastName
          username
          picture
          callByType
          circleColor
          labelColor
        }
        foundationUser_getOne {
          email
        }
      }
      `,
    })

    //clean up
    resolve(response?.data)
  })
}


export const postProfileGraphQL = ({firstName, lastName, username, picture, callByType, circleColor, labelColor}) => {
  return new Promise(async (resolve) => {

    const response = await callApi({
      query: `
      mutation($firstName: String, $lastName: String, $username: String, $picture: String, $callByType: CallByTypeEnum, $circleColor: String, $labelColor: String) {
        foundationUserProfile_updateOne(firstName: $firstName, lastName: $lastName, username: $username, picture: $picture, callByType: $callByType, circleColor: $circleColor, labelColor: $labelColor) {
        id    
        }
      }
      `,
      variables: {firstName, lastName, username, picture, callByType, circleColor, labelColor}
    })

    //clean up
    resolve(response?.data)
  })
}