import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import addOne from "./scripts/fileSql/addOne.script"
import deleteOne from "./scripts/fileSql/deleteOne.script"
import getMany from "./scripts/fileSql/getMany.script"
import getOneById from "./scripts/fileSql/getOneById.script"
import restoreTrashed from "./scripts/fileSql/restoreTrashed.script"
import updateOne from "./scripts/fileSql/updateOne.script"
import viewTrashed from "./scripts/fileSql/viewTrashed.script"

export default function makeBackendMediaManagerFileSql(d: dependencies) {

  return {
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getMany: getMany(d),
    getOneById: getOneById(d),
    updateOne: updateOne(d),
    viewTrashed: viewTrashed(d),
    restoreTrashed: restoreTrashed(d),
  }
}