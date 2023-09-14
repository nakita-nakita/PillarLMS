import _ from "lodash";
import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { SamePageObject } from "./getAllUsersFromPage.script";

type input = {
  userId: string,
  url: string,
  testmode?: boolean
}

export default function removeUserFromPage(d: d_allDomain) {

  return async (args: input): Promise<returningSuccessObj<SamePageObject>> => {

    const hashname = "collaborateSamePage"
    const location = args.testmode ? `test-${hashname}` : hashname

    //get current listings and add this user to it, yes there will be doubles with multiple tabs.
    const currentPage = await d.cacheService.get({
      location,
      key: args.url
    })

    // remove the JSON, this has a race condition in the code, but it can process so fast that it is within tolerance.
    for (let i = 0; i < currentPage.users.length; i++) {
      const user = currentPage.users[i];

      if (user.id === args.userId) {
        currentPage.users.splice(i, 1)
        break;
      }
    }
    
    let listings = {...currentPage}
    
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


