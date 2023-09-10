import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types"
import { d_domain } from "../../../../../../utils/types/dependencyInjection.types"
import sequelizeErrorHandler from "../../../../../../utils/errorHandling/handers/sequelize.errorHandler"
import makeFoundationUserEntity from "../../../../../../domain/foundation/user"
import { sendEmail } from "../../../../../../utils/third-parties/sendgrid/sendEmail"
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func"
import { isStringValidEmail } from "../../../../../../utils/stringHelpers/checkEmail"

type input = {
  email: string
}

export default function forgotPassword(d: d_domain) {
  return async (args: input): Promise<returningSuccessObj<null>> => {

    const { domainDb, errorHandler, transaction, loggers } = d

    const { userMain, } = makeFoundationUserEntity(d)

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.email) {
      return endMainFromError({
        hint: "Email is missing.",
        errorIdentifier: "foundationAuth_forgotPassword_error:0001"
      })
    }

    const isEmailValid = isStringValidEmail({
      str: args.email,
    })

    if (!isEmailValid.result) {
      return endMainFromError({
        hint: "Email is not a valid email.",
        errorIdentifier: "foundationAuth_forgotPassword_error:0002"
      })
    }

    // const { settingEmailMain } = makeBackendSettingEmailEntity(d)


    // const settingEmail = await settingEmailMain.getOne()


    // const emailResponse = await sendEmail({
    //   to: args.email,
    //   from: process.env.SENDGRID_FROM,
    //   subject: settingEmail.data.dataValues.resetPasswordEmailSubject,
    //   text: settingEmail.data.dataValues.resetPasswordEmailMessage,
    // }).catch(errorHandler)

    return {
      success: true,
      // data: emailResponse,
    }
  }
}