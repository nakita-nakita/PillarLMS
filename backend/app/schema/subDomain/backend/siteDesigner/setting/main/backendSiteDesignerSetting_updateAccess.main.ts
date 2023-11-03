import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import getAll from "./scripts/updateAccessMain/getAll.script"
import setList from "./scripts/updateAccessMain/setList.script"

export default function makeBackendSiteDesignerSettingUpdateAccessMain(d: dependencies) {

  return {
    getAll: getAll(d),
    setList: setList(d),
  }
}
