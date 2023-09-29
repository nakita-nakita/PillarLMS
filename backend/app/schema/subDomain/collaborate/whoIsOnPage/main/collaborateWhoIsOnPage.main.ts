import { d_allDomain } from "../../../../utils/types/dependencyInjection.types"
import getAllUsersFromPage from "./scripts/collaborateWhoIsOnPageMain/getAllUsersFromPage.script"

export default function makeCollaborateWhoIsOnPageMain(d: d_allDomain) {
  return {
    getAllUsersFromPage: getAllUsersFromPage(d),
  }
}