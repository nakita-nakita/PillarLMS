import _ from "lodash";
import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSingleton from "../../_singleton.ram-cache";
import { socketLookUpType } from "../socketLookUp/socketRecord.types";
import makeBoardcasters from "../../broadcasters.ram-cache";
import makeSocketLookUp from "../../socketLookUp.ram-cache";
import makeBackendUserProfileMain from "../../../../../backend/user/main/backendUserProfile.main";
import makeFoundationUserProfileMain from "../../../../../../domain/foundation/user/main/foundationUserProfile.main";

type input = {
  id: string,
}

export default function changeDisplayForUser(d: d_allDomain) {

  const getDisplayName = ({ callByType, email, username, firstName, lastName }) => {
    switch (callByType) {
      case "EMAIL":
        return email

      case "USERNAME":
        return username

      case "FIRST_NAME":
        return firstName

      case "LAST_NAME":
        return lastName

      case "FULL_NAME":
        return `${firstName} ${lastName}`
      default:
        return email
    }
  }
  return async (args: input): Promise<returningSuccessObj<null>> => {

    let success = false;
    const singletonFunc = makeSingleton(d)
    const profile = makeFoundationUserProfileMain(d)

    const singleton = await singletonFunc.get()

    if (!singleton.data?.socketLookUp) {
      // init if doesn't exist.
      singleton.data.socketLookUp = []
    }

    const userProfile = await profile.getOneById({
      id: args.id,
    })


    for (let i = 0; i < singleton.data.socketLookUp.length; i++) {
      const lookup = singleton.data.socketLookUp[i];

      if (lookup.userId === args.id) {
        singleton.data.socketLookUp[i].callByType = userProfile.data.dataValues.callByType
        singleton.data.socketLookUp[i].circleColor = userProfile.data.dataValues.circleColor
        singleton.data.socketLookUp[i].firstName = userProfile.data.dataValues.firstName
        singleton.data.socketLookUp[i].labelColor = userProfile.data.dataValues.labelColor
        singleton.data.socketLookUp[i].lastName = userProfile.data.dataValues.lastName
        singleton.data.socketLookUp[i].username = userProfile.data.dataValues.username
        singleton.data.socketLookUp[i].picture = userProfile.data.dataValues.picture
        singleton.data.socketLookUp[i].displayName = getDisplayName({
          callByType: userProfile.data.dataValues.callByType,
          email: singleton.data.socketLookUp[i].email,
          firstName: userProfile.data.dataValues.firstName,
          lastName: userProfile.data.dataValues.lastName,
          username: userProfile.data.dataValues.username,
        })


        success = true;
      }
    }

    return {
      success,
    }
  }
}


