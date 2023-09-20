import { d_allDomain } from "../../../../utils/types/dependencyInjection.types"
import getAllUsersFromPage from "./scripts/collaborateSamePageMain/getAllUsersFromPage.script"

export default function makeCollaborateSamePageMain(d: d_allDomain) {
  return {
    getAllUsersFromPage: getAllUsersFromPage(d),
  }
}