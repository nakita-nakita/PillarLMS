import { d_sub } from "../../../../../utils/types/dependencyInjection.types"
import getAll from "./scripts/readAccessMain/getAll.script"
import setList from "./scripts/readAccessMain/setList.script"

export default function makeBackendSiteDesignerSettingReadAccessMain(dbSub: d_sub) {

  return {
    getAll: getAll(dbSub),
    setList: setList(dbSub),
  }
}
