import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import getAll from "./scripts/updateAccessSql/getAll.script"
import setList from "./scripts/updateAccessSql/setList.script"

export default function makeBackendSiteDesignerSettingUpdateAccessSql(d: dependencies) {

  return {
    getAll: getAll(d),
    setList: setList(d),
  }
}
