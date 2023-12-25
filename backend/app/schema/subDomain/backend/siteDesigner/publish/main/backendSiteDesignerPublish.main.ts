import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import publishSite from "./scripts/publishMain/publishSite.script"

export default function makeBackendSiteDesignerPublishMain(d: dependencies) {

  return {
    publishSite: publishSite(d),
  }
}