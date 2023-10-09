import { getUserToken } from "@/utils/graphql/user"
import axios from "axios"


const postProfile = async ({
  event,
  callByType,
  firstName,
  lastName,
  username,
  circleColor,
  labelColor,
  originalPicture,
}) => {
  const userAvatar = `${process.env.NEXT_PUBLIC_WEB_API_URL}/backend/api/v1/profile/file`


  var formData = new FormData()
  const data = new FormData(event.currentTarget)

  if (originalPicture && (data.get('picture') !== "" || !data.get('picture'))) {
    formData.append('pictureAction', "remove")
  }

  formData.append('file', data.get('picture'))
  formData.append('callByType', callByType)
  formData.append('firstName', firstName)
  formData.append('lastName', lastName)
  formData.append('username', username)
  formData.append('circleColor', circleColor)
  formData.append('labelColor', labelColor)

  const token = getUserToken()

  const config = {
    headers: {
      "Authorization": `Bearer ${token}`,
      'content-type': 'multipart/form-data',
    }
  }

  const response = await axios.post(userAvatar, formData, config)

  return response.data

}


export default postProfile

