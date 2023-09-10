import { d_sub } from "../../../../../utils/types/dependencyInjection.types"
import getAll from "./scripts/settingAccessMain/getAll.script"
import setList from "./scripts/settingAccessMain/setList.script"

export default function makeBackendSiteDesignerSettingSettingAccessMain(dbSub: d_sub) {

  return {
    getAll: getAll(dbSub),
    setList: setList(dbSub),
  }
}
