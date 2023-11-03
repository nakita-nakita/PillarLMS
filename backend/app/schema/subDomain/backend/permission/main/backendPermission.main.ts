import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import addMany from "./scripts/main/addMany.script"
import addOne from "./scripts/main/addOne.script"
import deleteOne from "./scripts/main/deleteOne.script"
import getManyWithPagination from "./scripts/main/getManyWithPagination.script"
import getOneById from "./scripts/main/getOneById.script"
import updateOne from "./scripts/main/updateOne.script"

export default function makeBackendPermissionMain(d: dependencies) {

  return {
    addMany: addMany(d),
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getManyWithPagination: getManyWithPagination(d),
    getOneById: getOneById(d),
    updateOne: updateOne(d),
  }
}
