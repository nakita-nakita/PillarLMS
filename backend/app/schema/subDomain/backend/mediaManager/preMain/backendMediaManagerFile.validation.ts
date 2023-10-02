import { d_sub } from "../../../../utils/types/dependencyInjection.types"
import isIdValid from "./scripts/fileValidation/isIdValid.script"

export default function makeBackendMediaManagerFileValidation(d: d_sub) {
  return {
    isIdValid: isIdValid(d),
  }
}
