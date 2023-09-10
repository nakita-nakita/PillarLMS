import { d_domain } from "../../../../utils/types/dependencyInjection.types"

import getOneById from "./scripts/foundationUserProfileMain/getOneById.script"
import upsertOne from "./scripts/foundationUserProfileMain/upsertOne.script"

export default function makeFoundationUserProfileMain(d: d_domain) {

  return {
    getOneById: getOneById(d),
    upsertOne: upsertOne(d),
  }
}