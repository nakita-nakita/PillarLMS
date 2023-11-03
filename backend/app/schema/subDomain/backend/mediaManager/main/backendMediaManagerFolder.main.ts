import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import addOne from "./scripts/meidaManagerFolder/addOne.script"
import deleteOne from "./scripts/meidaManagerFolder/deleteOne.script"
import getBreadCrumb from "./scripts/meidaManagerFolder/getBreadCrumb.script"
import getMany from "./scripts/meidaManagerFolder/getMany.script"
import getOneById from "./scripts/meidaManagerFolder/getOneById.script"
import updateOne from "./scripts/meidaManagerFolder/updateOne.script"

export default function makeBackendMediaManagerFolderMain(d: dependencies) {

  return {
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getBreadCrumb: getBreadCrumb(d),
    getMany: getMany(d),
    getOneById: getOneById(d),
    updateOne: updateOne(d),
  }
}