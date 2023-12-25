import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import addOne from "./scripts/publishRecordSql/addOne.script"
import deleteOne from "./scripts/publishRecordSql/deleteOne.script"
import getManyWithPagination from "./scripts/publishRecordSql/getManyWithPagination.script"
import getMany from "./scripts/publishRecordSql/getMany.script"
import getOneById from "./scripts/publishRecordSql/getOneById.script"
import updateOne from "./scripts/publishRecordSql/updateOne.script"

export default function makeBackendSiteDesignerPublishRecordSql(d: dependencies) {

  return {
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getManyWithPagination: getManyWithPagination(d),
    getMany: getMany(d),
    getOneById: getOneById(d),
    updateOne: updateOne(d),
  }
}