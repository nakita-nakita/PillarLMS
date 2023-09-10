import { d_sub } from "../../../../../utils/types/dependencyInjection.types"
import getOne from "./scripts/main/getOne.script"
import updateOne from "./scripts/main/updateOne.script"

export default function makeBackendSettingChurchMain(d: d_sub) {

  return {
    getOne: getOne(d),
    updateOne: updateOne(d),
  }
}