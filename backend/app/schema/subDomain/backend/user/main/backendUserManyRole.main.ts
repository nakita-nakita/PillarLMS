import { d_allDomain, d_sub } from "../../../../utils/types/dependencyInjection.types"
import addOne from "./scripts/userManyRoleMain/addOne.script"
import deleteOne from "./scripts/userManyRoleMain/deleteOne.script"
import getAll from "./scripts/userManyRoleMain/getAll.script"
import setList from "./scripts/userManyRoleMain/setList.script"

export default function makeBackendUserManyRoleMain(d: d_allDomain) {

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
