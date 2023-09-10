import { d_allDomain, d_sub } from "../../../../utils/types/dependencyInjection.types"
import addOne from "./scripts/userManyPermissionMain/addOne.script"
import deleteOne from "./scripts/userManyPermissionMain/deleteOne.script"
import getAll from "./scripts/userManyPermissionMain/getAll.script"
import setList from "./scripts/userManyPermissionMain/setList.script"

export default function makeBackendUserManyPermissionMain(d: d_allDomain) {

  const ds : d_sub = {
    errorHandler:d.errorHandler,
    subDomainDb: d.subDomainDb,
    transaction: d.subDomaintransaction,
    loggers: d.loggers
  }

  return {
    addOne: addOne(ds),
    deleteOne: deleteOne(ds),
    getAll: getAll(d),
    setList: setList(ds),
  }
}
