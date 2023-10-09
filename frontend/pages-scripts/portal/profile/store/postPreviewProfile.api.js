import { getUserToken } from "@/utils/graphql/user"
import axios from "axios"


const postPreviewProfile = async (event) => {
  const userAvatarPreview = `${process.env.NEXT_PUBLIC_WEB_API_URL}/backend/api/v1/profile/preview/file`

  const file = event.target.files[0]

  var formData = new FormData()
  formData.append('file', file)

  const token = getUserToken()

  const config = {
    headers: {
      "Authorization": `Bearer ${token}`,
      'content-type': 'multipart/form-data',
    }
  }

  const response = await axios.post(userAvatarPreview, formData, config)

  return response.data
}

export default postPreviewProfile