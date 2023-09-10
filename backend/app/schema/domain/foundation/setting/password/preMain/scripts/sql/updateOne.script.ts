import { Model } from "sequelize";
import { d_domain } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import foundationSetting_password from "../../../../../../../../models/domain/foundation/setting/foundationSetting_password.model";

type input = {
  passwordLength?,
  shouldHaveUppercaseLetter?,
  shouldHaveLowercaseLetter?,
  shouldHaveNumber?,
  shouldHaveSymbol?,
}

export default function updateOne({ domainDb, errorHandler, transaction, loggers, }: d_domain) {

  const db = domainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<foundationSetting_password> | null>>  => {

    const data = await db.foundationSetting_password.update(
      args,
      {
        where: {},
        returning: true,
        transaction,
      }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data: data[0] !== 0 ? data[1][0] : null,
    }
  }
}


