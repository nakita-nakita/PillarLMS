import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import addOne from "./scripts/pageSql/addOne.script"
import deleteOne from "./scripts/pageSql/deleteOne.script"
import getOneById from "./scripts/pageSql/getOneById.script"
import updateOne from "./scripts/pageSql/updateOne.script"
import setList from "./scripts/pageSql/setList.script"
import getOneBySlug from "./scripts/pageSql/getOneBySlug.script"

export default function makeClientSitePageSql(d: dependencies) {

  return {
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getOneById: getOneById(d),
    getOneBySlug: getOneBySlug(d),
    updateOne: updateOne(d),
    setList: setList(d),
  }
}