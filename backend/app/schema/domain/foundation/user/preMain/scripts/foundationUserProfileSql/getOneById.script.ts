import { Model } from "sequelize";
import foundationUserProfile from "../../../../../../../models/domain/foundation/user/foundationUserProfile.model";
import { d_domain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = { id: string }

export default function getOneById({ domainDb, errorHandler, domainTransaction, loggers, }: d_domain) {

  const db = domainDb.models;

  return async ({ id }: input): Promise<returningSuccessObj<Model<foundationUserProfile> | null>> => {

    const data = await db.foundationUserProfile.findOne({
      where: {
        id
      },
      transaction: domainTransaction,
    })
    
    //.catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data,
    }
  }
}


