import { d_sub } from "../../../../../utils/types/dependencyInjection.types"
import getAll from "./scripts/updateAccessMain/getAll.script"
import setList from "./scripts/updateAccessMain/setList.script"

export default function makeBackendSiteDesignerSettingUpdateAccessMain(dbSub: d_sub) {

  return {
    getAll: getAll(dbSub),
    setList: setList(dbSub),
  }
}
