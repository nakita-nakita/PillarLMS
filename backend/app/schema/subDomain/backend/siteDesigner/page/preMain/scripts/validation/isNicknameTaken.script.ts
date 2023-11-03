import { dependencies } from "../../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = { nickname: string }

export default function isNicknameTaken(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (where: input) => {

    const data: number = await db.backendSiteDesigner_page.count({
      where,
      transaction: d.subDomainTransaction,
    }).catch(error => d.errorHandler(error, d.loggers))


    return {
      success: true,
      result: data !== 0,
    }
  }
}


