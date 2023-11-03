import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"

import getOneById from "./scripts/foundationUserProfileMain/getOneById.script"
import upsertOne from "./scripts/foundationUserProfileMain/upsertOne.script"

export default function makeFoundationUserProfileMain(d: dependencies) {

  return {
    getOneById: getOneById(d),
    upsertOne: upsertOne(d),
  }
}