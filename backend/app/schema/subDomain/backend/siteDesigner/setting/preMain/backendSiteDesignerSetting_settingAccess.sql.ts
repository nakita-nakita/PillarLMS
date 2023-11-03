import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import getAll from "./scripts/settingAccessSql/getAll.script"
import setList from "./scripts/settingAccessSql/setList.script"

export default function makeBackendSiteDesignerSettingSettingAccessSql(d: dependencies) {

  return {
    getAll: getAll(d),
    setList: setList(d),
  }
}
