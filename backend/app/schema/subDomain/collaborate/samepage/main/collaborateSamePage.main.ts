import { d_allDomain } from "../../../../utils/types/dependencyInjection.types"
import addUserToPage from "./scripts/collaborateSamePageMain/addUserToPage.script"
import getAllUsersFromPage from "./scripts/collaborateSamePageMain/getAllUsersFromPage.script"
import removeUserFromPage from "./scripts/collaborateSamePageMain/removeUserFromPage.script"

export default function makeCollaborateSamePageMain(d: d_allDomain) {
  return {
    getAllUsersFromPage: getAllUsersFromPage(d),
    addUserToPage: addUserToPage(d),
    removeUserFromPage: removeUserFromPage(d),
  }
}