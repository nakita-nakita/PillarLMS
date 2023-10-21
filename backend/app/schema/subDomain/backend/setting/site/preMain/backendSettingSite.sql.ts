import { d_sub } from "../../../../../utils/types/dependencyInjection.types"
import getOne from "./scripts/sql/getOne.script"
import upsertOne from "./scripts/sql/upsertOne.script"

export default function makeBackendSettingSiteSql(d: d_sub) {

  return {
    getOne: getOne(d),
    upsertOne: upsertOne(d),
  }
}