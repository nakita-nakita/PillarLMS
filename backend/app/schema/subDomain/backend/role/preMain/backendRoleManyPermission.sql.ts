import { d_sub } from "../../../../utils/types/dependencyInjection.types"
import addMany from "./scripts/backendRoleManyPermissionSql/addMany.script"
import addOne from "./scripts/backendRoleManyPermissionSql/addOne.script"
import deleteMany from "./scripts/backendRoleManyPermissionSql/deleteMany.script"
import deleteOne from "./scripts/backendRoleManyPermissionSql/deleteOne.script"
import getAll from "./scripts/backendRoleManyPermissionSql/getAll.script"
import setList from "./scripts/backendRoleManyPermissionSql/setList.script"

export default function makeBackendRoleManyPermissionSql(d: d_sub) {

  return {
    addMany: addMany(d),
    addOne: addOne(d),
    deleteMany: deleteMany(d),
    deleteOne: deleteOne(d),
    getAll: getAll(d),
    setList: setList(d),
  }
}