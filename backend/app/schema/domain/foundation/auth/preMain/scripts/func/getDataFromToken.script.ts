import jwt from "jsonwebtoken"
import findSecret from "./findSecret.private"
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types"
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types"

type input = {
  token: string
  secret?: string
}

export default function getDataFromToken({ errorHandler, loggers, }: dependencies) {
  return async ({ token, secret }: input): Promise<returningSuccessObj<any | null>> => {

    let data = null

    if (!secret) {
      secret = findSecret
    }

    try {
      data = await jwt.verify(token, secret)
    } catch (err) {
      console.log(err)
      //empty, defaults to null
    }

    return {
      success: true,
      data,
    }
  }
}


