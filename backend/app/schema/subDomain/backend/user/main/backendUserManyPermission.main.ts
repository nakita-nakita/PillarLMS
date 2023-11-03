import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import addOne from "./scripts/userManyPermissionMain/addOne.script"
import deleteOne from "./scripts/userManyPermissionMain/deleteOne.script"
import getAll from "./scripts/userManyPermissionMain/getAll.script"
import setList from "./scripts/userManyPermissionMain/setList.script"

export default function makeBackendUserManyPermissionMain(d: dependencies) {
  return {
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getAll: getAll(d),
    setList: setList(d),
  }
}
