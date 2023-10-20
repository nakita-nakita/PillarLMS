'use-client'

import { getUserToken } from "@/utils/graphql/user"
import axios from "axios"
import { useContext } from "react"
import { getSocketId } from '@/utils/realtime/socket';


const postBrandingApi = async ({
  id,
  previewLogo,
  name,
  shouldApplyToTopNavMenu,
}) => {
  const socketId = getSocketId()
  const uploaderEndpoint = `${process.env.NEXT_PUBLIC_WEB_API_URL}/backend/api/v1/logo/file/`

  const formData = new FormData();
  formData.append('id', id)
  formData.append('previewLogo', previewLogo)
  formData.append('name', name)
  formData.append('shouldApplyToTopNavMenu', shouldApplyToTopNavMenu)

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


export default postBrandingApi

