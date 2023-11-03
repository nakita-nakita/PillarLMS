import makeFoundationUserValidation from "../preMain/foundationUser.validation"

import addMany from "./scripts/main/addMany.script"
import addOne from "./scripts/main/addOne.script"
import deactivateOne from "./scripts/main/deactivateOne.script"
import getOneById from "./scripts/main/getOneById.script"
import getOneByEmail from "./scripts/main/getOneByEmail.script"
import reactivateOne from "./scripts/main/reactivateOne.script"
import updateOne from "./scripts/main/updateOne.script"
import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"

export default function makeFoundationUserMain(d: dependencies) {
  const validators = makeFoundationUserValidation(d)

  return {
    addMany: addMany(d),
    addOne: addOne(d),
    deactivateOne: deactivateOne(d),
    getOneById: getOneById(d),
    getOneByEmail: getOneByEmail(d),
    reactivateOne: reactivateOne(d),
    updateOne: updateOne(d),
    ...validators,
  }
}