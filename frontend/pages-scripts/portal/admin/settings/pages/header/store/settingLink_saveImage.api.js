'use-client'

import axios from "axios"
import { getUserToken } from "@/utils/graphql/user"

const postSettingLinkApi = async ({
  id,
  imageValue,
  nameValue,
  titleValue,
  descriptionValue,
  isReadyValue,
}) => {
  const uploaderEndpoint = `${process.env.NEXT_PUBLIC_WEB_API_URL}/backend/api/v1/setting/link/file/`

  const formData = new FormData();
  formData.append('id', id)
  formData.append('previewImage', imageValue)
  formData.append('description', descriptionValue)
  formData.append('title', titleValue)
  formData.append('isReady', isReadyValue)

  const token = getUserToken()

  const config = {
    headers: {
      "Authorization": `Bearer ${token}`,
      'content-type': 'multipart/form-data',
    }
  }

  const response = await axios.post(uploaderEndpoint, formData, config)

  return response.data

}


export default postSettingLinkApi

