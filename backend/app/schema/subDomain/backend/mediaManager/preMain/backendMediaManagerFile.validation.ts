import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import isIdValid from "./scripts/fileValidation/isIdValid.script"

export default function makeBackendMediaManagerFileValidation(d: dependencies) {
  return {
    isIdValid: isIdValid(d),
  }
}
