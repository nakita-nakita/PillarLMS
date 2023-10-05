import { d_sub } from "../../../../../utils/types/dependencyInjection.types"
import deleteOne from "./scripts/discussionComment/deleteOne"
import getManyWithPagination from "./scripts/discussionComment/getManyWithPagination"
import updateOne from "./scripts/discussionComment/updateOne"
import addOne from "./scripts/discussionComment/addOne.script"
import getOneById from './scripts/discussionComment/getOneById.script'

export default function makeBackendSiteDesignerDiscussionCommentMain(d: d_sub) {

  return {
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getManyWithPagination: getManyWithPagination(d),
    getOneById: getOneById(d),
    updateOne: updateOne(d),
  }
}

