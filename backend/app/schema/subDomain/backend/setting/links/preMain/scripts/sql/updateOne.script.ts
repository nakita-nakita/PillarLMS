import { Model } from "sequelize";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";
import backendSetting_links from "../../../../../../../../models/subDomain/backend/setting/backendSetting_links.model";

type input = {
  donationLink?: string,
  virtualServicesLink?: string,
  defaultMetaPicture?: string,
  defaultMetaTitle?: string,
  defaultMetaDescription?: string,
}

export default function updateOne({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {
  const db = subDomainDb.models;

  return async (args: input): Promise<returningSuccessObj<Model<backendSetting_links> | null>> => {
    //count for 1
    const doesRecordExist = await db.backendSetting_links.count({
      where: {},
      transaction: subDomainTransaction,
    }).catch(error => errorHandler(error, loggers))

    //if not count, add instead
    if (!doesRecordExist) {
      const newData = await db.backendSetting_links.create(
        args,
        {
          transaction: subDomainTransaction,
          returning: true,
        }
      ).catch(error => errorHandler(error, loggers))

      return {
        success: true,
        data: newData,
      }
    }

    const data = await db.backendSetting_links.update(
      args,
      {
        where: {},
        returning: true,
        transaction: subDomainTransaction,
      }).catch(error => errorHandler(error, loggers))

    return {
      success: true,
      data: data[0] !== 0 ? data[1][0] : null,
    }
  }
}


