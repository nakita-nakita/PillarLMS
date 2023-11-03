import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import me from "./scripts/basicViewMain/me.script"
import them from "./scripts/basicViewMain/them.script"

export default function makeBackendUserBasicViewMain(d: dependencies) {

  return {
    me: me(d),
    them: them(d),
  }
}
