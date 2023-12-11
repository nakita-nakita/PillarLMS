import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import upsertOne from "./scripts/linkSql/upsertOne.script"
import getOneByPageId from "./scripts/linkSql/getOneByPageId.script"

export default function makeBackendSiteDesignerPageLinkSql(d: dependencies) {

  return {
    getOneByPageId: getOneByPageId(d),
    upsertOne: upsertOne(d),
  }
}