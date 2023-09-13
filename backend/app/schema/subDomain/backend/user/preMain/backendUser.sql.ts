import { d_allDomain } from "../../../../utils/types/dependencyInjection.types"
import addMany from "./scripts/sql/addMany.script"
import addOne from "./scripts/sql/addOne.script"
import deleteOne from "./scripts/sql/deleteOne.script"
import getOneById from "./scripts/sql/getOneById.script"
import updateOne from "./scripts/sql/updateOne.script"
import getManyWithPagination from "./scripts/sql/getManyWithPagination.script"

export default function makeBackendUserSql(d: d_allDomain) {

  return {
    addMany: addMany(d),
    addOne: addOne(d),
    getManyWithPagination: getManyWithPagination(d),
    deleteOne: deleteOne(d),
    getOneById: getOneById(d),
    updateOne: updateOne(d),
  }
}
