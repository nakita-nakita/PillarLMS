import { d_sub } from "../../../../../utils/types/dependencyInjection.types"
import addOne from "./scripts/sql/addOne.script"
import deleteOne from "./scripts/sql/deleteOne.script"
import getManyWithPagination from "./scripts/sql/getManyWithPagination.script"
import getOneById from "./scripts/sql/getOneById.script"
import updateOne from "./scripts/sql/updateOne.script"

export default function makeBackendSiteDesignerPageTemplateSql(dbSub: d_sub) {

  return {
    addOne: addOne(dbSub),
    deleteOne: deleteOne(dbSub),
    getManyWithPagination: getManyWithPagination(dbSub),
    getOneById: getOneById(dbSub),
    updateOne: updateOne(dbSub),
  }
}