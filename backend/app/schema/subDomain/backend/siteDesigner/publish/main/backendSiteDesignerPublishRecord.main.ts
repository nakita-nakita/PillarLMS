import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import addOne from "./scripts/publishRecordMain/addOne.script"
import getMany from "./scripts/publishRecordMain/getMany.script"
import deleteOne from "./scripts/publishRecordMain/deleteOne.script"
import getManyWithPagination from "./scripts/publishRecordMain/getManyWithPagination.script"
import getOneById from "./scripts/publishRecordMain/getOneById.script"
import updateOne from "./scripts/publishRecordMain/updateOne.script"

export default function makeBackendSiteDesignerPublishRecordMain(d: dependencies) {

  return {
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getManyWithPagination: getManyWithPagination(d),
    getMany: getMany(d),
    getOneById: getOneById(d),
    updateOne: updateOne(d),
  }
}