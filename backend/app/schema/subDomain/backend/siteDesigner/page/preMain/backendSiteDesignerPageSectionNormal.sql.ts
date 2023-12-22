import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import addOne from "./scripts/sectionNormal/addOne.script"
import deleteOne from "./scripts/sectionNormal/deleteOne.script"
import getManyByPageId from "./scripts/sectionNormal/getManyByPageId.script"
import getMany from "./scripts/sectionNormal/getMany.script"
import getOneById from "./scripts/sectionNormal/getOneById.script"
import updateOne from "./scripts/sectionNormal/updateOne.script"

export default function makeBackendSiteDesignerPageSectionNormalSql(d: dependencies) {

  return {
    addOne: addOne(d),
    getManyByPageId: getManyByPageId(d),
    getMany: getMany(d),
    getOneById: getOneById(d),
    updateOne: updateOne(d),
    deleteOne: deleteOne(d),
  }
}