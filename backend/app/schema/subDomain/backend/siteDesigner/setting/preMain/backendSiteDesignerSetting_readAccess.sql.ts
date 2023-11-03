import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import getAll from "./scripts/readAccessSql/getAll.script"
import setList from "./scripts/readAccessSql/setList.script"

export default function makeBackendSiteDesignerSettingReadAccessSql(d: dependencies) {

  return {
    getAll: getAll(d),
    setList: setList(d),
  }
}
