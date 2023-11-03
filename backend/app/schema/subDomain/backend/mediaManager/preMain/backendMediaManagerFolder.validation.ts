import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import isIdValid from "./scripts/folderValidation/isIdValid.script"

export default function makeBackendMediaManagerFolderValidation(d: dependencies) {
  return {
    isIdValid: isIdValid(d),
  }
}
