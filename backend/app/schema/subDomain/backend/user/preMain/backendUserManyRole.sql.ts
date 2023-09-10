import { d_sub } from "../../../../utils/types/dependencyInjection.types"
import addMany from "./scripts/userManyRoleSql/addMany.script"
import addOne from "./scripts/userManyRoleSql/addOne.script"
import deleteMany from "./scripts/userManyRoleSql/deleteMany.script"
import deleteOne from "./scripts/userManyRoleSql/deleteOne.script"
import getAll from "./scripts/userManyRoleSql/getAll.script"
import setList from "./scripts/userManyRoleSql/setList.script"

export default function makeBackendUserManyRoleSql(d: d_sub) {
  return {
    addMany: addMany(d),
    addOne: addOne(d),
    deleteMany: deleteMany(d),
    deleteOne: deleteOne(d),
    getAll: getAll(d),
    setList: setList(d),
  }
}
