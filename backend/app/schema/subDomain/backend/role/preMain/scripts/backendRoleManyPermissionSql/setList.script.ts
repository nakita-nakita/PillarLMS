import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import makeSetList from "../../../../../../utils/engine/setList.engine";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

type input = {
  id?: string
  roleId: string
  permissionId: string
}

export default function setList(d: dependencies) {

  const db = d.subDomainDb.models;

  return async (setArray: input[]): Promise<returningSuccessObj<null>> => {

    const setListEngine = makeSetList({ errorHandler: d.errorHandler, loggers: d.loggers, })

    const response = await setListEngine({
      setArray,
      dbEntity: db.backendRoleManyPermission,
      transaction: d.subDomainTransaction,
      currentDbArray: await db.backendRoleManyPermission.findAll({
        transaction: d.subDomainTransaction,
      })
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}


