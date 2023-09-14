import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { UserObjectType } from "../types/UserObject.script";
import _ from "lodash"

export type SamePageObject = {
  total: number
  users: [UserObjectType]
}

type input = {
  url: string,
  testmode?: boolean
}

export default function getAllUsersFromPage(d: d_allDomain) {

  return async (args: input): Promise<returningSuccessObj<SamePageObject>> => {

    const hashname = "collaborateSamePage"
    const location = args.testmode ? `test-${hashname}` : hashname
    const key = `${args.url}`;

    //redis
    let listings = await d.cacheService.get({
      location,
      key,
    })

    listings.users = _.uniqBy(listings.users, 'id');

    return {
      success: true,
      data: {
        total: listings?.users?.length || 0,
        users: listings?.users || []
      }
    }
  }
}


