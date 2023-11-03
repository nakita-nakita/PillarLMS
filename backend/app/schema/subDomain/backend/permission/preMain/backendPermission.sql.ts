import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import addMany from "./scripts/sql/addMany.script"
import addOne from "./scripts/sql/addOne.script"
import deleteOne from "./scripts/sql/deleteOne.script"
import getManyWithPagination from "./scripts/sql/getManyWithPagination.script"
import getOneById from "./scripts/sql/getOneById.script"
import updateOne from "./scripts/sql/updateOne.script"

export default function makeBackendPermissionSql(d: dependencies) {

  return {
    addMany: addMany(d),
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getManyWithPagination: getManyWithPagination(d),
    getOneById: getOneById(d),
    updateOne: updateOne(d),
  }
}