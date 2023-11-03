import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = { id: string }

export default function isIdValid(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (where: input) => {

    const data: number = await db.backendSiteDesignerSetting_updateAccess.count({
      where,
      transaction: d.subDomainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      result: data !== 0,
    }
  }
}


