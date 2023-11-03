import { Model } from "sequelize"
import foundationUser from "../../../../../../../models/domain/foundation/user/foundationUser.model"
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types"
import bcrypt from "bcryptjs"
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types"

type input = {
  email: string
  password: string
  isDeactivated?: boolean
}

export default function addOne(d: dependencies) {
  const db = d.domainDb.models

  return async (args: input): Promise<returningSuccessObj<Model<foundationUser> | null>> => {

    args.password = bcrypt.hashSync(args.password, 8)

    const data = await db.foundationUser.create(
      args,
      {
        transaction: d.domainTransaction,
        returning: true,
      }
    ).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


