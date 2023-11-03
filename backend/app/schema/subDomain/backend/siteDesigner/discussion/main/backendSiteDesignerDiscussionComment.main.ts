import deleteOne from "./scripts/discussionComment/deleteOne"
import getManyWithPagination from "./scripts/discussionComment/getManyWithPagination"
import updateOne from "./scripts/discussionComment/updateOne"
import addOne from "./scripts/discussionComment/addOne.script"
import getOneById from './scripts/discussionComment/getOneById.script'
import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"

export default function makeBackendSiteDesignerDiscussionCommentMain(d: dependencies) {

  return {
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getManyWithPagination: getManyWithPagination(d),
    getOneById: getOneById(d),
    updateOne: updateOne(d),
  }
}

