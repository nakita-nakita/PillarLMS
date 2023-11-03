import { Model } from "sequelize";
import foundationUserProfile from "../../../../../../../models/domain/foundation/user/foundationUserProfile.model";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = { id: string }

export default function getOneById(d: dependencies) {

  const db = d.domainDb.models;

  return async ({ id }: input): Promise<returningSuccessObj<Model<foundationUserProfile> | null>> => {

    const data = await db.foundationUserProfile.findOne({
      where: {
        id
      },
      transaction: d.domainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


