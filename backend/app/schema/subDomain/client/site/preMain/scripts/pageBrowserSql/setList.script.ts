import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import makeSetList from "../../../../../../utils/engine/setList.engine";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = {
  id?: string;
  pageId?: string;
  tabName?: string;
};

export default function setList(d: dependencies) {
  const db = d.subDomainDb.models;

  return async (setArray: input[]): Promise<returningSuccessObj<null>> => {

    const setListEngine = makeSetList(d)

    const response = await setListEngine({
      setArray,
      dbEntity: db.clientSitePageBrowser,
      transaction: d.subDomainTransaction,
      currentDbArray: await db.clientSitePageBrowser.findAll({
        transaction: d.subDomainTransaction,
      })
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}