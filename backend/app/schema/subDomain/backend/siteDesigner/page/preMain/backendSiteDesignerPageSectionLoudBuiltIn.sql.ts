import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import getMany from "./scripts/sectionLoudBuiltIn/getMany.script"
import getOneById from "./scripts/sectionLoudBuiltIn/getOneById.script"

export default function makeBackendSiteDesignerPageSectionLoudBuiltInSql(d: dependencies) {

  return {
    getMany: getMany(d),
    getOneById: getOneById(d),
  }
}