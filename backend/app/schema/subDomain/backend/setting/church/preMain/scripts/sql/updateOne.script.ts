import { Model } from "sequelize";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import backendSetting_church from "../../../../../../../../models/subDomain/backend/setting/backendSetting_church.model";
// import backendSetting_backendUserRequest, { backendSetting_backendUserRequestEnum } from "../../../../../../../../models/subDomain/backend/setting/backendSetting_church.model";

type input = {
  logo?: string,
  streetAddress?: string,
  suiteNumber?: string,
  zipCode?: string,
  city?: string,
  state?: string,
  socialTwitter?: string,
  socialFacebook?: string,
  socialInstagram?: string,
  socialWhatsapp?: string,
  socialTelegram?: string,
}

export default function updateOne({ subDomainDb, errorHandler, transaction, loggers, }: d_sub) {
  const db = subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendSetting_church> | null>> => {
    //count for 1
    const doesRecordExist = await db.backendSetting_church.count({
      where: { },
      transaction,
    }).catch(error => errorHandler(error, loggers))

    //if not count, add instead
    if (!doesRecordExist) {
      const newData = await db.backendSetting_church.create(
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


    const data = await db.backendSetting_church.update(
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


