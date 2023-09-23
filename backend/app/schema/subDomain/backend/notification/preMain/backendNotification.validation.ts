import { d_sub } from "../../../../utils/types/dependencyInjection.types"
import areIdsValid from "./scripts/validation/areIdsValid.script"
import isIdValid from "./scripts/validation/isIdValid.script"

export default function makeBackendNotificationValidation(d: d_sub) {

  return {
    areIdsValid: areIdsValid(d),
    isIdValid: isIdValid(d),
  }
}