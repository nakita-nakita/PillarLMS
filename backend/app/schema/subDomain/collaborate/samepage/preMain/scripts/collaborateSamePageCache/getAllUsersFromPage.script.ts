import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { UserObjectType } from "../types/UserObject.script";

type ReturnObject = {
  total: number
  users: [UserObjectType]
}

type input = {
  url: string,
  testmode?: boolean
}

export default function getAllUsersFromPage(d: d_allDomain) {

  return async (args: input): Promise<returningSuccessObj<ReturnObject>> => {

    const hashname = "collaborateSamePage"
    const location = args.testmode ? `test-${hashname}` : hashname

    //redis
    const currentPage = await d.redisClient.hGet(location, args.url)
    let listings = JSON.parse(currentPage)

    return {
      success: true,
      data: {
        total: listings.users.length,
        users: listings.users
      }
    }
  }
}


