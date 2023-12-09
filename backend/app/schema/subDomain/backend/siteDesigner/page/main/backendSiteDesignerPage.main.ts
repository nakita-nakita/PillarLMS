import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import makeValidations from "../preMain/backendSiteDesignerPage.validation"
import addOne from "./scripts/pageMain/addOne.script"
import deleteOne from "./scripts/pageMain/deleteOne.script"
import getManyWithPagination from "./scripts/pageMain/getManyWithPagination.script"
import getOneById from "./scripts/pageMain/getOneById.script"
import updateOne from "./scripts/pageMain/updateOne.script"

export default function makeBackendSiteDesignerPageMain(d: dependencies) {
  const validators = makeValidations(d)

  return {
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getManyWithPagination: getManyWithPagination(d),
    getOneById: getOneById(d),
    updateOne: updateOne(d),
    ...validators
  }
}