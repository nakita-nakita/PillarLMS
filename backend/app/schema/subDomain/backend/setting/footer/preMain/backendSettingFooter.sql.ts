import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import getOne from "./scripts/footer/getOne.script"
import upsertOne from "./scripts/footer/upsertOne.script"

export default function makeBackendSettingFooterSql(d: dependencies) {

  return {
    getOne: getOne(d),
    upsertOne: upsertOne(d),
  }
}