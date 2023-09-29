import { d_allDomain } from "../../../../utils/types/dependencyInjection.types"
import getAllUsersFromPage from "./scripts/collaborateWhoIsOnPageCache/getAllUsersFromPage.script"

export default function makeCollaborateWhoIsOnPageCache(d: d_allDomain) {
  return {
    getAllUsersFromPage: getAllUsersFromPage(d),
  }
}