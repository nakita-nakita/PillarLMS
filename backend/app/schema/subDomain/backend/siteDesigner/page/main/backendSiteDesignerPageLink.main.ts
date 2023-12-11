import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import getOneByPageId from "./scripts/linkMain/getOneByPageId.script"
import getOneRealTimeByPageId from "./scripts/linkMain/getOneRealTimeByPageId.script"
import upsertOne from "./scripts/linkMain/upsertOne.script"

export default function makeBackendSiteDesignerPageLinkMain(d: dependencies) {

  return {
    getOneByPageId: getOneByPageId(d),
    getOneRealTimeByPageId: getOneRealTimeByPageId(d),
    upsertOne: upsertOne(d),
  }
}