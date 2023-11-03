import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import areIdsValid from "./scripts/validation/areIdsValid.script"
import isIdValid from "./scripts/validation/isIdValid.script"

export default function makeBackendNotificationValidation(d: dependencies) {

  return {
    areIdsValid: areIdsValid(d),
    isIdValid: isIdValid(d),
  }
}