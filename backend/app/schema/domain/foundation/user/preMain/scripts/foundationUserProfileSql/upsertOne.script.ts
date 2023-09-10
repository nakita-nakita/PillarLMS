import { Model } from "sequelize";
import foundationUserProfile from "../../../../../../../models/domain/foundation/user/foundationUserProfile.model";
import { d_domain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

export enum CallByTypeEnum {
  EMAIL,
  USERNAME,
  FIRST_NAME,
  LAST_NAME,
  FULL_NAME,
}

type input = {
  id: string,
  firstName?: string,
  lastName?: string,
  username?: string,
  picture?: string,
  callByType?: CallByTypeEnum,
  circleColor?: string,
  labelColor?: string,
}

export default function upsertOne({ domainDb, errorHandler, transaction, loggers, }: d_domain) {

  const db = domainDb.models;

  return async ({ id, ...args }: input): Promise<returningSuccessObj<Model<foundationUserProfile> | null>> => {

    //count for 1
    const doesUserHaveAProfile = await db.foundationUserProfile.count({
      where: { id, },
      transaction,
    }).catch(error => errorHandler(error, loggers))

    //if not count, add instead
    if (!doesUserHaveAProfile) {
      const newData = await db.foundationUserProfile.create(
        { id, ...args },
        {
          transaction,
          returning: true,
        }
      ).catch(error => errorHandler(error, loggers))

      return {
        success: true,
        data: newData,
      }
    }

    const data = await db.foundationUserProfile.update(
      args,
      {
        where: { id, },
        returning: true,
        transaction,
      }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data: data[0] !== 0 ? data[1][0] : null,
    }
  }
}


