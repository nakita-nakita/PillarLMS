import { d_domain } from "../../../../../../utils/types/dependencyInjection.types"
import jwt from "jsonwebtoken"
import findSecret from "./findSecret.private"
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types"

type input = {
  userId: string,
  secret?: string
}

export default function getDataFromToken({ errorHandler, loggers, }: d_domain) {

  return async ({ userId, secret }: input): Promise<returningSuccessObj<string>>  => {

    if (!secret) {
      secret = findSecret
    }
    
    let jwtData = { userId, }

    var data = jwt.sign(jwtData, secret, {
      expiresIn: 86400, // 24 hours
    })

    return {
      success: true,
      data,
    }
  }
}


