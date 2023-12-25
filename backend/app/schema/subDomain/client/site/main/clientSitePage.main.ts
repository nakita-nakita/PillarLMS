import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import addOne from "./scripts/pageMain/addOne.script"
import deleteOne from "./scripts/pageMain/deleteOne.script"
import getOneById from "./scripts/pageMain/getOneById.script"
import updateOne from "./scripts/pageMain/updateOne.script"
import setList from "./scripts/pageMain/setList.script"
import getOneBySlug from "./scripts/pageMain/getOneBySlug.script"

export default function makeClientSitePageMain(d: dependencies) {

  return {
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getOneById: getOneById(d),
    getOneBySlug: getOneBySlug(d),
    updateOne: updateOne(d),
    setList: setList(d),
  }
}