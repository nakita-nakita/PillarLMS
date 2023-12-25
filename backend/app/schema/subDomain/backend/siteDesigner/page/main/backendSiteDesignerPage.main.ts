import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import makeValidations from "../preMain/backendSiteDesignerPage.validation"
import addOne from "./scripts/pageMain/addOne.script"
import getMany from "./scripts/pageMain/getMany.script"
import deleteOne from "./scripts/pageMain/deleteOne.script"
import getManyWithPagination from "./scripts/pageMain/getManyWithPagination.script"
import getOneById from "./scripts/pageMain/getOneById.script"
import getOneRealTimeById from "./scripts/pageMain/getOneRealTimeById.script"
import updateOne from "./scripts/pageMain/updateOne.script"
import getOneBySlug from "./scripts/pageMain/getOneBySlug.script"

export default function makeBackendSiteDesignerPageMain(d: dependencies) {
  const validators = makeValidations(d)

  return {
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getManyWithPagination: getManyWithPagination(d),
    getMany: getMany(d),
    getOneById: getOneById(d),
    getOneBySlug: getOneBySlug(d),
    getOneRealTimeById: getOneRealTimeById(d),
    updateOne: updateOne(d),
    ...validators
  }
}