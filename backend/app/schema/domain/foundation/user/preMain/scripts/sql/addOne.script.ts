import { Model } from "sequelize"
import foundationUser from "../../../../../../../models/domain/foundation/user/foundationUser.model"
import { d_domain } from "../../../../../../utils/types/dependencyInjection.types"
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types"
import bcrypt from "bcryptjs"

type input = {
  email: string
  password: string
  isDeactivated?: boolean
}

export default function addOne({ domainDb, errorHandler, domainTransaction, loggers }: d_domain) {
  const db = domainDb.models

  return async (args: input): Promise<returningSuccessObj<Model<foundationUser> | null>> => {

    args.password = bcrypt.hashSync(args.password, 8)

    const data = await db.foundationUser.create(
      args,
      {
        transaction: domainTransaction,
        returning: true,
      }
    ).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data,
    }
  }
}


