import { Model } from "sequelize"
import bcrypt from "bcryptjs"
import foundationUser from "../../../../../../../models/domain/foundation/user/foundationUser.model"
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types"
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types"

type input = {
  email: string
  password: string
}

export default function addMany(d: dependencies) {

  const db = d.domainDb.models;

  return async (argsArray: input[]): Promise<returningSuccessObj<Model<foundationUser>[] | null>> => {

    const savingArray = argsArray.map(args => ({
      ...args,
      password: bcrypt.hashSync(args.password, 8)
    }))

    const data = await db.foundationUser.bulkCreate(savingArray, {
      transaction: d.domainTransaction,
      returning: true,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}
