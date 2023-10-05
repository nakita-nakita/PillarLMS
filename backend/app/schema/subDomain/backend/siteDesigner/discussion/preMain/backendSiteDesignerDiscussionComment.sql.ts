import { d_sub } from "../../../../../utils/types/dependencyInjection.types"
import addOne from "./scripts/discussionCommentSql/addOne.script"
import deleteOne from "./scripts/discussionCommentSql/deleteOne.script"
import getManyWithPagination from "./scripts/discussionCommentSql/getManyWithPagination.script"
import getOneById from "./scripts/discussionCommentSql/getOneById.script"
import updateOne from "./scripts/discussionCommentSql/updateOne.script"

export default function makeBackendSiteDesignerDiscussionCommentSql(d: d_sub) {

  return {
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getManyWithPagination: getManyWithPagination(d),
    getOneById: getOneById(d),
    updateOne: updateOne(d),
  }
}