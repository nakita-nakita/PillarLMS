import { Model } from "sequelize";
import backendUser from "../../../../../../../models/subDomain/backend/user/backendUser.model";
import { d_allDomain, d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeCollaborateSamePageType from "../../collaborateSamePage.types";
import makeBackendUserMain from "../../../../../backend/user/main/backendUser.main";
import makeBackendUserProfileMain from "../../../../../backend/user/main/backendUserProfile.main";
import makeFoundationUserMain from "../../../../../../domain/foundation/user/main/foundationUser.main";
import { CallByTypeEnum } from "../../../../../../domain/foundation/user/preMain/scripts/foundationUserProfileSql/upsertOne.script";
import { SamePageObject } from "./getAllUsersFromPage.script";
import _ from "lodash"

type input = {
  userId: string,
  url: string,
  testmode?: boolean
}

export default function addUserToPage(d: d_allDomain) {

  return async (args: input): Promise<returningSuccessObj<SamePageObject>> => {

    // import prebuilts
    const collaborateSamePageType = makeCollaborateSamePageType()
    const backendUser = makeFoundationUserMain(d)
    const backendUserProfile = makeBackendUserProfileMain(d)

    // get data from sql
    const user = await backendUser.getOneById({ id: args.userId })
    const userProfile = await backendUserProfile.getOneById({ id: args.userId })

    // use type construction to create new object.
    const userForListings = await collaborateSamePageType.UserObject({
      id: user.data.dataValues.id,
      email: user.data.dataValues.email,
      callByType: CallByTypeEnum[userProfile.data?.dataValues?.callByType],
      circleColor: userProfile.data?.dataValues?.circleColor,
      firstName: userProfile.data?.dataValues?.firstName,
      labelColor: userProfile.data?.dataValues?.labelColor,
      lastName: userProfile.data?.dataValues?.lastName,
      picture: userProfile.data?.dataValues?.picture,
      username: userProfile.data?.dataValues?.username,
    })

    const hashname = "collaborateSamePage"
    const location = args.testmode ? `test-${hashname}` : hashname
    const key = `${args.url}`;

    //get current listings and add this user to it, yes there will be doubles with multiple tabs.
    const currentPage = await d.cacheService.get({
      location,
      key,
    })
    let listings;

    if (currentPage) {
      currentPage.users.push(userForListings.data)
      listings = { ...currentPage }

    } else {
      listings = {
        users: [userForListings.data]
      }

      await d.cacheService.set({
        location,
        key,
        value: listings
      })
    }

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


