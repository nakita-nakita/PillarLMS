import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import getAll from "./scripts/settingAccessMain/getAll.script"
import setList from "./scripts/settingAccessMain/setList.script"

export default function makeBackendSiteDesignerSettingSettingAccessMain(d: dependencies) {

  return {
    getAll: getAll(d),
    setList: setList(d),
  }
}
