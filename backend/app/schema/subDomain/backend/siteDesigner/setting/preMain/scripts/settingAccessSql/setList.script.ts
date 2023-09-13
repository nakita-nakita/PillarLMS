import makeSetList from "../../../../../../../utils/engine/setList.engine";
import { d_sub } from "../../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../../utils/types/returningObjs.types";

type input = {
  id?: string
  userId: string
}

export default function setList({ subDomainDb, errorHandler, subDomainTransaction, loggers, }: d_sub) {

  const db = subDomainDb.models;

  return async (setArray: input[]): Promise<returningSuccessObj<null>> => {

    const setListEngine = makeSetList({ errorHandler, loggers, })


    const response = await setListEngine({
      setArray,
      dbEntity: db.backendSiteDesignerSetting_settingAccess,
      transaction: subDomainTransaction,
      currentDbArray: await db.backendSiteDesignerSetting_settingAccess.findAll({
        transaction: subDomainTransaction,
      })
    }).catch(error => errorHandler(error, loggers))

    return response
  }
}


