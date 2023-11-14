import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import getMany from "./scripts/headerBuiltIn/getMany.script"

export default function makeBackendSettingHeaderBuiltInSql(d: dependencies) {

  return {
    getMany: getMany(d),
  }
}