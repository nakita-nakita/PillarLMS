import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import backendMediaManagerFolder from "../../../../../../../models/subDomain/backend/mediaManager/backendMediaManagerFolder.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = { id: string }

export default function getOneById(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (where: input): Promise<returningSuccessObj<Model<backendMediaManagerFolder> | null>> => {

    const data = await db.backendMediaManagerFolder.findOne({
      where: {
        ...where,
        deletedAt: null,
      },
      transaction: d.subDomainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data,
    }
  }
}


