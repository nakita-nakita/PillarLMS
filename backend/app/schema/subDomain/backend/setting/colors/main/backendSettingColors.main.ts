import { d_allDomain, d_sub } from "../../../../../utils/types/dependencyInjection.types"
import getOne from "./scripts/main/getOne.script"
import upsertOne from "./scripts/main/upsertOne.script"

export default function makeBackendSettingColorsMain(d: d_allDomain) {

  return {
    getOne: getOne(d),
    upsertOne: upsertOne(d),
  }
}