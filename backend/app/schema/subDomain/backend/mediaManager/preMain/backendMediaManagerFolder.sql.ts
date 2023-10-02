import { d_sub } from "../../../../utils/types/dependencyInjection.types"
import addOne from "./scripts/folderSql/addOne.script"
import deleteOne from "./scripts/folderSql/deleteOne.script"
import getAllChildFolders from "./scripts/folderSql/getAllChildFolders.script"
import getBreadCrumb from "./scripts/folderSql/getBreadCrumb.script"
import getMany from "./scripts/folderSql/getMany.script"
import getOneById from "./scripts/folderSql/getOneById.script"
import restoreTrashed from "./scripts/folderSql/restoreTrashed.script"
import updateOne from "./scripts/folderSql/updateOne.script"

export default function makeBackendMediaManagerFolderSql(d: d_sub) {

  return {
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getBreadCrumb: getBreadCrumb(d),
    getMany: getMany(d),
    getOneById: getOneById(d),
    updateOne: updateOne(d),
    restoreTrashed: restoreTrashed(d),
    getAllChildFolders: getAllChildFolders(d),
  }
}