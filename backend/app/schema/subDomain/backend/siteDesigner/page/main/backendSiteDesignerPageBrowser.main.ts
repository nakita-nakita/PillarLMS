import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import getOneByPageId from "./scripts/browserMain/getOneByPageId.script"
import getOneRealTimeByPageId from "./scripts/browserMain/getOneRealTimeByPageId.script"
import upsertOne from "./scripts/browserMain/upsertOne.script"

export default function makeBackendSiteDesignerPageBrowserMain(d: dependencies) {

  return {
    getOneByPageId: getOneByPageId(d),
    getOneRealTimeByPageId: getOneRealTimeByPageId(d),
    upsertOne: upsertOne(d),
  }
}