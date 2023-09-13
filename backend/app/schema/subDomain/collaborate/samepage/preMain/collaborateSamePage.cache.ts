import { d_allDomain } from "../../../../utils/types/dependencyInjection.types"
import addUserToPage from "./scripts/collaborateSamePageCache/addUserToPage.script"
import getAllUsersFromPage from "./scripts/collaborateSamePageCache/getAllUsersFromPage.script"
import removeUserFromPage from "./scripts/collaborateSamePageCache/removeUserFromPage.script"

export default function makeCollaborateSamePageCache(d: d_allDomain) {
  return {
    getAllUsersFromPage: getAllUsersFromPage(d),
    addUserToPage: addUserToPage(d),
    removeUserFromPage: removeUserFromPage(d),
  }
}