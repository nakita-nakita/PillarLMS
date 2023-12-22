import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import publishSite from "./scripts/publish/publishSite.script"

export default function makeBackendSiteDesignerPublishMain(d: dependencies) {

  return {
    publishSite: publishSite(d),
  }
}