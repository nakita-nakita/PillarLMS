import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = {
  userId: string,
  url: string,
  testmode?: boolean
}

export default function removeUserFromPage(d: d_allDomain) {

  return async (args: input): Promise<returningSuccessObj<null>> => {

    const hashname = "collaborateSamePage"
    const location = args.testmode ? `test-${hashname}` : hashname

    //get current listings and add this user to it, yes there will be doubles with multiple tabs.
    const currentPage = await d.redisClient.hGet(location, args.url)
    let listings = JSON.parse(currentPage)

    // remove the JSON, this has a race condition in the code, but it can process so fast that it is within tolerance.
    for (let i = 0; i < listings.users.length; i++) {
        const user = listings.users[i];
        
        if (user.id === args.userId) {
            listings.users.splice(i, 1)
            break;
        }

    }

    await d.redisClient.hSet(location, args.url, JSON.stringify(listings))

    return {
      success: true,
    }
  }
}


