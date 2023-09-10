import { d_sub } from "../../../../utils/types/dependencyInjection.types"
import areIdsValid from "./scripts/validation/areIdsValid.script"
import isIdValid from "./scripts/validation/isIdValid.script"
import hasBeenClick from "./scripts/validation/hasBeenClick.script"
import hasBeenSeen from "./scripts/validation/hasBeenSeen.script"
import doYouHaveNewNotifications from "./scripts/validation/doYouHaveNewNotifications.script"

export default function makeBackendNotificationValidation(d: d_sub) {

  return {
    areIdsValid: areIdsValid(d),
    isIdValid: isIdValid(d),
    hasBeenClick: hasBeenClick(d),
    hasBeenSeen: hasBeenSeen(d),
    doYouHaveNewNotifications: doYouHaveNewNotifications(d),
  }
}