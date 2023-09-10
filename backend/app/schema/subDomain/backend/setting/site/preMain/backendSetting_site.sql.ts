import { d_sub } from "../../../../../utils/types/dependencyInjection.types"
import getOne from "./scripts/sql/getOne.script"
import updateOne from "./scripts/sql/updateOne.script"

export default function makeBackendSettingSiteSql(d: d_sub) {

  return {
    getOne: getOne(d),
    updateOne: updateOne(d),
  }
}