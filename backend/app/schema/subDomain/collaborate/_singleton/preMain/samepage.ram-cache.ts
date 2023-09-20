import { d_allDomain } from "../../../../utils/types/dependencyInjection.types"
import changeUrlForUser from "./scripts/samepage/changeUrlForUser.script"
import getAllUsersFromUrl from "./scripts/samepage/getAllUsersFromUrl.script"

export default function makeSamepage(d: d_allDomain) {
  return {
    changeUrlForUser: changeUrlForUser(d),
    getAllUsersFromUrl: getAllUsersFromUrl(d)
  }
}