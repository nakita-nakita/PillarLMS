import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import addOne from "./scripts/discussion/addOne.script"
import deleteOne from "./scripts/discussion/deleteOne.script"
import getManyWithPagination from "./scripts/discussion/getManyWithPagination.script"
import getOneById from "./scripts/discussion/getOneById.script"
import updateOne from "./scripts/discussion/updateOne.script"

export default function makeBackendSiteDesignerDiscussionMain(d: dependencies) {

  return {
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getManyWithPagination: getManyWithPagination(d),
    getOneById: getOneById(d),
    updateOne: updateOne(d),
  }
}