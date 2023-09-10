import { d_domain } from "../../../../utils/types/dependencyInjection.types"
import getOneById from "./scripts/foundationUserProfileSql/getOneById.script"
import upsertOne from "./scripts/foundationUserProfileSql/upsertOne.script"

export default function makeFoundationUserProfileSql(d: d_domain) {
  return {
    getOneById: getOneById(d),
    upsertOne: upsertOne(d),
  }
}
