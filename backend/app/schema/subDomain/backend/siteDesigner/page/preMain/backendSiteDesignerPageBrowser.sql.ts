import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import upsertOne from "./scripts/browserSql/upsertOne.script"
import getOneByPageId from "./scripts/browserSql/getOneByPageId.script"

export default function makeBackendSiteDesignerPageBrowserSql(d: dependencies) {

  return {
    getOneByPageId: getOneByPageId(d),
    upsertOne: upsertOne(d),
  }
}