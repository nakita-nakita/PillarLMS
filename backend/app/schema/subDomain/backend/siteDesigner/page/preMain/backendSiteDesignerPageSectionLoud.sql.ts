import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import getOneByPageId from "./scripts/sectionLoud/getOneByPageId.script"
import getOneById from "./scripts/sectionLoud/getOneById.script"
import getMany from "./scripts/sectionLoud/getMany.script"
import upsertOne from "./scripts/sectionLoud/upsertOne.script"
import deleteOne from "./scripts/sectionLoud/deleteOne.script"

export default function makeBackendSiteDesignerPageSectionLoudSql(d: dependencies) {

  return {
    getOneByPageId: getOneByPageId(d),
    getOneById: getOneById(d),
    getMany: getMany(d),
    upsertOne: upsertOne(d),
    deleteOne: deleteOne(d),
  }
}