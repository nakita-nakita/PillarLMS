import { Model } from "sequelize";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import backendSetting_colors from "../../../../../../../../models/subDomain/backend/setting/backendSetting_colors.model";

type input = {
  color1: string,
  color2: string,
  color3: string,
  color4: string,
  color5: string,
  lightBackgroundColor: string,
  lightTextColor: string,
  darkBackgroundColor: string,
  darkTextColor: string,
}

export default function updateOne({ subDomainDb, errorHandler, transaction, loggers, }: d_sub) {
  const db = subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendSetting_colors> | null>> => {
    //count for 1
    const doesRecordExist = await db.backendSetting_colors.count({
      where: {},
      transaction,
    }).catch(error => errorHandler(error, loggers))

    //if not count, add instead
    if (!doesRecordExist) {
      const newData = await db.backendSetting_colors.create(
        args,
        {
          transaction,
          returning: true,
        }
      ).catch(error => errorHandler(error, loggers))

      return {
        success: true,
        data: newData,
      }
    }

    const data = await db.backendSetting_colors.update(
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