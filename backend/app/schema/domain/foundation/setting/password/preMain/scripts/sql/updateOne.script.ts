import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import foundationSetting_password from "../../../../../../../../models/domain/foundation/setting/foundationSetting_password.model";
import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  passwordLength?,
  shouldHaveUppercaseLetter?,
  shouldHaveLowercaseLetter?,
  shouldHaveNumber?,
  shouldHaveSymbol?,
}

export default function updateOne({ domainDb, errorHandler, domainTransaction, loggers, }: dependencies) {

  const db = domainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<foundationSetting_password> | null>>  => {

    const data = await db.foundationSetting_password.update(
      args,
      {
        where: {},
        returning: true,
        transaction: domainTransaction,
      }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data: data[0] !== 0 ? data[1][0] : null,
    }
  }
}


