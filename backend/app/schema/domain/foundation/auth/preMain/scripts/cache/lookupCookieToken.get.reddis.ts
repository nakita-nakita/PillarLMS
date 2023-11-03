import Cookies from 'js-cookie'
import { dependencies } from '../../../../../../utils/dependencies/type/dependencyInjection.types'
// import redisClient from "../../../../../../../reddis"

type input = {
  cookie: string
}

export default function lookupCookieTokenGet({ errorHandler, loggers, }: dependencies) {
  return async ({ cookie }: input) => {

    //create list soon
    // const data = await redisClient.get(cookie);

    return {
      success: true,
      data: null,
    }
  }
}


