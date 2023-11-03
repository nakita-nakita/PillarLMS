import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import changeDisplayForUser from "./scripts/whoIsOnPage/changeDisplayForUser.script"
import changeUrlForUser from "./scripts/whoIsOnPage/changeUrlForUser.script"
import getAllUsersFromUrl from "./scripts/whoIsOnPage/getAllUsersFromUrl.script"

export default function makeWhoIsOnPage(d: dependencies) {
  return {
    changeUrlForUser: changeUrlForUser(d),
    getAllUsersFromUrl: getAllUsersFromUrl(d),
    changeDisplayForUser: changeDisplayForUser(d),
  }
}