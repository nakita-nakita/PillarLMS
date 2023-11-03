import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import getOneById from "./scripts/foundationUserProfileSql/getOneById.script"
import upsertOne from "./scripts/foundationUserProfileSql/upsertOne.script"

export default function makeFoundationUserProfileSql(d: dependencies) {
  return {
    getOneById: getOneById(d),
    upsertOne: upsertOne(d),
  }
}
