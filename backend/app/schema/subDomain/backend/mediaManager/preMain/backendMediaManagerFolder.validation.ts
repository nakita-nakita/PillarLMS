import { d_sub } from "../../../../utils/types/dependencyInjection.types"
import isIdValid from "./scripts/folderValidation/isIdValid.script"

export default function makeBackendMediaManagerFolderValidation(d: d_sub) {
  return {
    isIdValid: isIdValid(d),
  }
}
