import { d_allDomain } from "../../../../utils/types/dependencyInjection.types"
import changeDisplayForUser from "./scripts/whoIsOnPage/changeDisplayForUser.script"
import changeUrlForUser from "./scripts/whoIsOnPage/changeUrlForUser.script"
import getAllUsersFromUrl from "./scripts/whoIsOnPage/getAllUsersFromUrl.script"

export default function makeWhoIsOnPage(d: d_allDomain) {
  return {
    changeUrlForUser: changeUrlForUser(d),
    getAllUsersFromUrl: getAllUsersFromUrl(d),
    changeDisplayForUser: changeDisplayForUser(d),
  }
}