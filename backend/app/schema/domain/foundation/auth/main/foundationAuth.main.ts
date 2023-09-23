import { d_allDomain } from "../../../../utils/types/dependencyInjection.types"

// const canUserSignUp = require("./scripts/helpers/canUserSignUp.script")
import forgotPassword from "./scripts/main/forgotPassword.script"
import signin from "./scripts/main/signIn.script"
import signup from "./scripts/main/signUp.script"
import isTokenValid from "./scripts/main/isTokenValid.script"

export default function makeFoundationAuthMain(d: d_allDomain) {

  return {
    forgotPassword: forgotPassword(d),
    signin: signin(d),
    signup: signup(d),
    isTokenValid: isTokenValid(d),
  }
}