import foundationUser from "../../../../../../../models/domain/foundation/user/foundationUser.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = { id: string }

export default function reactivate(d: dependencies) {

  const db = d.domainDb.models;

  return async (where: input): Promise<returningSuccessObj<foundationUser | null>> => {

    const data = await db.foundationUser.update(
      {
        isDeactivated: false,
      },
      {
        where,
        returning: true,
        transaction: d.domainTransaction,
      }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data[0] !== 0 ? data[1][0] : null,
    }
  }
}


