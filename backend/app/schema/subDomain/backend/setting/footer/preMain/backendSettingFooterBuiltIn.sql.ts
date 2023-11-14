import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import getMany from "./scripts/footerBuiltIn/getMany.script"

export default function makeBackendSettingFooterBuiltInSql(d: dependencies) {

  return {
    getMany: getMany(d),
  }
}