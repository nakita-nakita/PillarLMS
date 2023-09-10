import { d_domain } from "../../../../utils/types/dependencyInjection.types"
import lookupCookieTokenGet from "./scripts/cache/lookupCookieToken.get.reddis"
import lookupCookieTokenSet from "./scripts/cache/lookupCookieToken.set.reddis"

export default function makeFoundationAuthCache(d: d_domain) {

  return {
    lookupCookieTokenGet: lookupCookieTokenGet(d),
    lookupCookieTokenSet: lookupCookieTokenSet(d),
  }
}