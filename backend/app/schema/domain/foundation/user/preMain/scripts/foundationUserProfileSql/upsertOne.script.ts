import { Model } from "sequelize";
import foundationUserProfile from "../../../../../../../models/domain/foundation/user/foundationUserProfile.model";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

export enum CallByTypeEnum {
  EMAIL = "EMAIL",
  USERNAME = "USERNAME",
  FIRST_NAME = "FIRST_NAME",
  LAST_NAME = "LAST_NAME",
  FULL_NAME = "FULL_NAME",
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

export default function upsertOne(d: dependencies) {

  const db = d.domainDb.models;

  return async ({ id, ...args }: input): Promise<returningSuccessObj<Model<foundationUserProfile> | null>> => {

    //count for 1
    const doesUserHaveAProfile = await db.foundationUserProfile.count({
      where: { id, },
      transaction: d.domainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    //if not count, add instead
    if (!doesUserHaveAProfile) {
      const newData = await db.foundationUserProfile.create(
        { id, ...args },
        {
          transaction: d.domainTransaction,
          returning: true,
        }
      ).catch(error => d.errorHandler(error, d.loggers))

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
        transaction: d.domainTransaction,
      }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data[0] !== 0 ? data[1][0] : null,
    }
  }
}


