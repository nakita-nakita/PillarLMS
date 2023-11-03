import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import getAll from "./scripts/readAccessMain/getAll.script"
import setList from "./scripts/readAccessMain/setList.script"

export default function makeBackendSiteDesignerSettingReadAccessMain(d: dependencies) {

  return {
    getAll: getAll(d),
    setList: setList(d),
  }
}
