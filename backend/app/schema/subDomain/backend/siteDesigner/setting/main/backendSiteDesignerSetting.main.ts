import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import getOne from "./scripts/main/getOne.script"
import updateOne from "./scripts/main/updateOne.script"

export default function makeBackendSiteDesignerSettingMain(d: dependencies) {

  return {
    getOne: getOne(d),
    updateOne: updateOne(d),
  }
}