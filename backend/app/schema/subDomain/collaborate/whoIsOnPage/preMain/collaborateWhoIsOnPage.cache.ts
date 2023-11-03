import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import getAllUsersFromPage from "./scripts/collaborateWhoIsOnPageCache/getAllUsersFromPage.script"

export default function makeCollaborateWhoIsOnPageCache(d: dependencies) {
  return {
    getAllUsersFromPage: getAllUsersFromPage(d),
  }
}