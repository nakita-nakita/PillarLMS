import signinToken from "./scripts/func/signToken.script"
import getDataFromToken from "./scripts/func/getDataFromToken.script"
import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"

export default function makeFoundationAuthFunc(d: dependencies) {

  return {
    signinToken: signinToken(d),
    getDataFromToken: getDataFromToken(d),
  }
}