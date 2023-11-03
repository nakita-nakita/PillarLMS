import addMany from "./scripts/sql/addMany.script"
import addOne from "./scripts/sql/addOne.script"
import deleteOne from "./scripts/sql/deleteOne.script"
import getOneById from "./scripts/sql/getOneById.script"
import updateOne from "./scripts/sql/updateOne.script"
import getManyWithPagination from "./scripts/sql/getManyWithPagination.script"
import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"

export default function makeBackendUserSql(d: dependencies) {

  return {
    addMany: addMany(d),
    addOne: addOne(d),
    getManyWithPagination: getManyWithPagination(d),
    deleteOne: deleteOne(d),
    getOneById: getOneById(d),
    updateOne: updateOne(d),
  }
}
