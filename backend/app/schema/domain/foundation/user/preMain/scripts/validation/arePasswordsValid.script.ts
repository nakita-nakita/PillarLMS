import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types"
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types"

type input = { 
  email: string
  password: string 
}

export default function arePasswordsValid(d: dependencies) {

  const db = d.domainDb.models

  return async (args: input[]): Promise<returningSuccessObj<null>> => {

    const findOne = await db.foundationSetting_password.findOne().catch(error => d.errorHandler(error, d.loggers))
    const passwordRules = findOne.dataValues
    const errorArray = []

    for (let i = 0; i < args.length; i++) {

      const { email, password, } = args[i]

      if (password.length < passwordRules.passwordLength) {
        errorArray.push(
          `recordId '${email}': Password but be a minimum of length of ${passwordRules.passwordLength}.`
        );
      }

      if (passwordRules.shouldHaveUppercaseLetter && !/[A-Z]/.test(password)) {
        errorArray.push(`recordId '${email}': One uppercase character needed.`)
      }

      if (passwordRules.shouldHaveLowercaseLetter && !/[a-z]/.test(password)) {
        errorArray.push(`recordId '${email}': One lowercase character needed.`)
      }

      if (passwordRules.shouldHaveLowercaseLetter && !/\d/.test(password)) {
        errorArray.push(`recordId '${email}': One number needed.`)
      }

      if (
        passwordRules.shouldHaveSymbol &&
        !/[|\\/~^:,;?!&%$@*+]/.test(password)
      ) {
        errorArray.push(`recordId '${email}': One symbol needed.`)
      }

      if (errorArray.length) {
        errorArray.unshift("recordId '${email}': Password has error(s).")
      }
    }

    if (errorArray.length === 0) {
      return {
        success: true,
        result: true
      }
    } else {
      return {
        success: true,
        result: false,
        humanMessage: errorArray.join("<br />")
      }
    }
  }
}


