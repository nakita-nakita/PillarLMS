import { d_allDomain, d_domain } from "../../../../utils/types/dependencyInjection.types"
import me from "./scripts/basicViewMain/me.script"
import them from "./scripts/basicViewMain/them.script"

export default function makeBackendUserBasicViewMain(d: d_domain) {

  return {
    me: me(d),
    them: them(d),
  }
}
