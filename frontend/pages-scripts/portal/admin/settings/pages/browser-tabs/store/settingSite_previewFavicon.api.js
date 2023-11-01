'use-client'

import { getUserToken } from "@/utils/graphql/user"
import axios from "axios"
import { useContext } from "react"
import { getSocketId } from '@/utils/realtime/socket';


const postSettingSitePreviewApi = async ({
  event,
  entity,
  name,
}) => {
  const socketId = getSocketId()
  const uploaderEndpoint = `${process.env.NEXT_PUBLIC_WEB_API_URL}/backend/api/v1/setting/site/preview/file/`

  const formData = new FormData();
  formData.append('file', event.target.files[0])
  formData.append('entity', entity)
  formData.append('name', name)
  formData.append('socketId', socketId)

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


export default postSettingSitePreviewApi

