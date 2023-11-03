import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import getAllUsersFromPage from "./scripts/collaborateWhoIsOnPageMain/getAllUsersFromPage.script"

export default function makeCollaborateWhoIsOnPageMain(d: dependencies) {
  return {
    getAllUsersFromPage: getAllUsersFromPage(d),
  }
}