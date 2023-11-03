import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types"
import getOne from "./scripts/sql/getOne.script"
import updateOne from "./scripts/sql/updateOne.script"

export default function makeFoundationSettingPasswordSql(d: dependencies) {

  return {
    getOne: getOne(d),
    updateOne: updateOne(d),
  }
}