import { Model } from "sequelize";
import foundationUser from "../../../../../../../models/domain/foundation/user/foundationUser.model";
import { d_domain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = {
  email: string
}

export default function getOneByEmail({ domainDb, errorHandler, transaction, loggers, }: d_domain) {
  const db = domainDb.models;

  return async (where: input): Promise<returningSuccessObj<Model<foundationUser> | null>> => {

    const data = await db.foundationUser.findOne({
      where,
      transaction,
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data,
    }
  }
}


