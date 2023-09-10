import { d_domain } from "../../../../../../utils/types/dependencyInjection.types"
import Cookies from 'js-cookie'
// import redisClient from "../../../../../../../reddis"

type input = {
  cookie: string
}

export default function lookupCookieTokenGet({ errorHandler, loggers, }: d_domain) {
  return async ({ cookie }: input) => {

    //create list soon
    // const data = await redisClient.get(cookie);

    return {
      success: true,
      data: null,
    }
  }
}


