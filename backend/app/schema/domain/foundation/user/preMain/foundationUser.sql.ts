import { d_domain } from "../../../../utils/types/dependencyInjection.types"
import addMany from "./scripts/sql/addMany.script"
import addOne from "./scripts/sql/addOne.script"
import deactivateOne from "./scripts/sql/deactivateOne.script"
import getManyWithPagination from "./scripts/sql/getManyWithPagination.script"
import getOneById from "./scripts/sql/getOneById.script"
import getOneByEmail from "./scripts/sql/getOneByEmail.script"
import updateOne from "./scripts/sql/updateOne.script"
import reactivateOne from "./scripts/sql/reactivateOne.script"

export default function makeFoundationUserSql(d: d_domain) {

  return {
    addMany: addMany(d),
    addOne: addOne(d),
    deactivateOne: deactivateOne(d),
    getManyWithPagination: getManyWithPagination(d),
    getOneById: getOneById(d),
    getOneByEmail: getOneByEmail(d),
    reactivateOne: reactivateOne(d),
    updateOne: updateOne(d),
  }
}