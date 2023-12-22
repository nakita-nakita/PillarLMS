import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import addOne from "./scripts/pageSql/addOne.script"
import deleteOne from "./scripts/pageSql/deleteOne.script"
import getManyWithPagination from "./scripts/pageSql/getManyWithPagination.script"
import getMany from "./scripts/pageSql/getMany.script"
import getOneById from "./scripts/pageSql/getOneById.script"
import updateOne from "./scripts/pageSql/updateOne.script"

export default function makeBackendSiteDesignerPageSql(d: dependencies) {

  return {
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getManyWithPagination: getManyWithPagination(d),
    getMany: getMany(d),
    getOneById: getOneById(d),
    updateOne: updateOne(d),
  }
}