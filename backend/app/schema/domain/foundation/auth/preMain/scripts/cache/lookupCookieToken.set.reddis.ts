import { d_domain } from "../../../../../../utils/types/dependencyInjection.types"
import Cookies from 'js-cookie'
// import redisClient from "../../../../../../../reddis"

type input = {
  token: string
}

export default function lookupCookieTokenSet({ errorHandler, loggers, }: d_domain) {
  return async ({ token }: input) => {

    const data = Cookies.set(Math.random().toString(), Math.random().toString())

    // await redisClient.set(data, token);

    return {
      success: true,
      data: null,
    }
  }
}


