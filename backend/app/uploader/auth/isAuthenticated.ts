import makeFoundationAuthFunc from "../../schema/domain/foundation/auth/preMain/foundationAuth.func";
import { makeDObj } from "../../schema/utils/dependencies/makeDependency";


const isAuthenticated = async (req, res, next) => {
  const bearerToken = req.get("Authorization") || req.get("authorization");
  const token = bearerToken.split(' ')[1]

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized."
    })
  }

  const d = await makeDObj()
  const authFunc = makeFoundationAuthFunc(d)
  let userId;

  try {
     userId = (await authFunc.getDataFromToken({ token })).data.userId

  } catch (error) {

  }
  
  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized."
    })
  }

  req.user = req.user || {};
  req.user.id = userId

  return next()
}

const uploaderAuth = {
  isAuthenticated,
}

export default  uploaderAuth