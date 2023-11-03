import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import addOne from "./scripts/discussionSql/addOne.script"
import deleteOne from "./scripts/discussionSql/deleteOne.script"
import getManyWithPagination from "./scripts/discussionSql/getManyWithPagination.script"
import getOneById from "./scripts/discussionSql/getOneById.script"
import updateOne from "./scripts/discussionSql/updateOne.script"

export default function makeBackendSiteDesignerDiscussionSql(d: dependencies) {

  return {
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getManyWithPagination: getManyWithPagination(d),
    getOneById: getOneById(d),
    updateOne: updateOne(d),
  }
}
