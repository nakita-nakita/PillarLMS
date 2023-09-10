import { d_sub } from "../../../../utils/types/dependencyInjection.types"
import addMany from "./scripts/userManyPermissionSql/addMany.script"
import addOne from "./scripts/userManyPermissionSql/addOne.script"
import deleteMany from "./scripts/userManyPermissionSql/deleteMany.script"
import deleteOne from "./scripts/userManyPermissionSql/deleteOne.script"
import getAll from "./scripts/userManyPermissionSql/getAll.script"
import setList from "./scripts/userManyPermissionSql/setList.script"

export default function makeBackendUserManyPermissionSql(d: d_sub) {
  return {
    addMany: addMany(d),
    addOne: addOne(d),
    deleteMany: deleteMany(d),
    deleteOne: deleteOne(d),
    getAll: getAll(d),
    setList: setList(d),
  }
}
