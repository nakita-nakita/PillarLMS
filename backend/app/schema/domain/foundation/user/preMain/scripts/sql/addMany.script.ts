import { Model } from "sequelize"
import bcrypt from "bcryptjs"
import foundationUser from "../../../../../../../models/domain/foundation/user/foundationUser.model"
import { d_domain } from "../../../../../../utils/types/dependencyInjection.types"
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types"

type input = {
  email: string
  password: string
}

export default function addMany({ domainDb, errorHandler, domainTransaction, loggers }: d_domain) {

  const db = domainDb.models;

  return async (argsArray: input[]): Promise<returningSuccessObj<Model<foundationUser>[] | null>> => {

    const savingArray = argsArray.map(args => ({
      ...args,
      password: bcrypt.hashSync(args.password, 8)
    }))

    const data = await db.foundationUser.bulkCreate(savingArray, {
      transaction: domainTransaction,
      returning: true,
    }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data,
    }
  }
}
