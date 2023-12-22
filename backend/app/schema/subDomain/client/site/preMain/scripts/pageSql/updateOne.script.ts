import { Model } from "sequelize";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import clientSitePage from "../../../../../../../models/subDomain/client/site/clientSitePage.model";

type input = {
  id: string
  slug?: string
}

export default function updateOne(d: dependencies) {

  const db = d.subDomainDb.models;

  return async ({ id, ...args }: input): Promise<returningSuccessObj<Model<clientSitePage> | null>> => {

    const data = await db.clientSitePage.update(
      args,
      {
        where: { id, },
        returning: true,
        transaction: d.subDomainTransaction,
      }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      data: data[0] !== 0 ? data[1][0] : null,
    }
  }
}


