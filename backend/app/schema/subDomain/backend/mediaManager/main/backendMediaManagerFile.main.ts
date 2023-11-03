import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import addOne from "./scripts/mediaManagerFile/addOne.script"
import deleteOne from "./scripts/mediaManagerFile/deleteOne.script"
import getMany from "./scripts/mediaManagerFile/getMany.script"
import getOneById from "./scripts/mediaManagerFile/getOneById.script"
import restoreTrashed from "./scripts/mediaManagerFile/restoreTrashed.script"
import updateOne from "./scripts/mediaManagerFile/updateOne.script"
import viewTrashed from "./scripts/mediaManagerFile/viewTrashed.script"

export default function makeBackendMediaManagerFileMain(d: dependencies) {

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