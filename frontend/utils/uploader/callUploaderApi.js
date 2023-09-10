import axios from "axios"
import { getUserToken } from "../graphql/user"

const callUploaderApi = async ({ url, files }) => {
  // const userAvatarPreview = `${process.env.NEXT_PUBLIC_WEB_API_URL}/api/v1/uploader/user-avatar-previewer`
  // const file = event.target.files[0]

  var formData = new FormData()
  formData.append('files', files)

  const token = getUserToken()

  const config = {
    headers: {
      "Authorization": `Bearer ${token}`,
      'content-type': 'multipart/form-data',
    }
  }

  const response = await axios.post(url, formData, config)

  return {
    success: true,
    data: response.data,
  }
}

// const getUploaderApi = async ({ url }) => {

//   const token = getUserToken()

//   const config = {
//     headers: {
//       "Authorization": `Bearer ${token}`,
//       'content-type': 'multipart/form-data',
//     }
//   }

//   const response = await axios.get(url, config)

//   return {
//     success: true,
//     data: response,
//   }
// }

const postUserAvatarPreview = async ({ file }) => {
  return await callUploaderApi({
    url: `${process.env.NEXT_PUBLIC_WEB_API_URL}/api/v1/uploader/user-avatar-previewer`,
    files: file,
  })
}

const postUserAvatar = async ({ file }) => {
  return await callUploaderApi({
    url: `${process.env.NEXT_PUBLIC_WEB_API_URL}/api/v1/uploader/user-avatar`,
    files: file,
  })
}
// const getUserAvatarPreview = async ({ url }) => {
//   return await getUploaderApi({ url })
// }


const uploaderUtil = {
  callUploaderApi,
  postUserAvatarPreview,
  postUserAvatar,
}

export default uploaderUtil;

