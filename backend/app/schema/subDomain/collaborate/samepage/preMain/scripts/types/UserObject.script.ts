import { Model } from "sequelize";
import backendUser from "../../../../../../../models/subDomain/backend/user/backendUser.model";
import { d_allDomain, d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { CallByTypeEnum } from "../../../../../../domain/foundation/user/preMain/scripts/foundationUserProfileSql/upsertOne.script";

export type UserObjectType = {
  id: String
  email: String
  firstName?: String
  lastName?: String
  username?: String
  picture?: String
  callByType?: CallByTypeEnum
  circleColor?: String
  labelColor?: String
}

export default function UserObject() {
  return async (args: UserObjectType): Promise<returningSuccessObj<UserObjectType>> => {
    return {
      success: true,
      // creating new object
      data: {...args},
    }
  }
}



// id: ID!
// email: String
// firstName: String
// lastName: String
// username: String
// picture: String
// callByType: CallByTypeEnum
// circleColor: String
// // labelColor: String