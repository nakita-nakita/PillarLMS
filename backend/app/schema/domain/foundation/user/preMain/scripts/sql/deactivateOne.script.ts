import foundationUser from "../../../../../../../models/domain/foundation/user/foundationUser.model";
import { d_domain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = { id: string }

export default function deactivateOne({ domainDb, errorHandler, transaction, loggers, }: d_domain) {

  const db = domainDb.models;

  return async (where: input): Promise<returningSuccessObj<foundationUser | null>> => {

    const data = await db.foundationUser.update(
      {
        isDeactivated: true,
      },
      {
        where,
        returning: true,
        transaction,
      }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data: data[0] !== 0 ? data[1][0] : null,
    }
  }
}


