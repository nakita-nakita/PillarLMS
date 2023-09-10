import { d_sub } from "../../../../../utils/types/dependencyInjection.types"
import makeValidations from "../preMain/backendSiteDesigner_page.validation"
import addOne from "./scripts/main/addOne.script"
import deleteOne from "./scripts/main/deleteOne.script"
import getManyWithPagination from "./scripts/main/getManyWithPagination.script"
import getOneById from "./scripts/main/getOneById.script"
import updateOne from "./scripts/main/updateOne.script"

export default function makeBackendSiteDesignerPageMain(d: d_sub) {
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