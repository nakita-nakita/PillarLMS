import { d_allDomain } from "../../../../utils/types/dependencyInjection.types"
import getAllUsersFromPage from "./scripts/collaborateSamePageCache/getAllUsersFromPage.script"

export default function makeCollaborateSamePageCache(d: d_allDomain) {
  return {
    getAllUsersFromPage: getAllUsersFromPage(d),
  }
}