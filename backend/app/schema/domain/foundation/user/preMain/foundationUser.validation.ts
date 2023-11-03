import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import areEmailsTaken from "./scripts/validation/areEmailsTaken.script"
import areIdsValid from "./scripts/validation/areIdsValid.script"
import arePasswordsValid from "./scripts/validation/arePasswordsValid.script"
import doesAUserExists from "./scripts/validation/doesAUserExists.script"
import isEmailTaken from "./scripts/validation/isEmailTaken.script"
import isIdValid from "./scripts/validation/isIdValid.script"
import isPasswordCorrect from "./scripts/validation/isPasswordCorrect.script"
import isPasswordValid from "./scripts/validation/isPasswordValid.script"

export default function makeFoundationUserValidation(d: dependencies) {
  return {
    areEmailsTaken: areEmailsTaken(d),
    areIdsValid: areIdsValid(d),
    arePasswordsValid: arePasswordsValid(d),
    isIdValid: isIdValid(d),
    doesAUserExists: doesAUserExists(d),
    isEmailTaken: isEmailTaken(d),
    isPasswordCorrect: isPasswordCorrect(d),
    isPasswordValid: isPasswordValid(d),
  }
}
