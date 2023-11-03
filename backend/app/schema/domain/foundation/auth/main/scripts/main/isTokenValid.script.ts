import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types"
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types"
import makeFoundationAuthFunc from "../../../preMain/foundationAuth.func"

type input = {
  token: string
}

export default function isTokenValid(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<null>> => {

    const authFunc = makeFoundationAuthFunc(d)

    //////////////////////////////////////
    // Validations
    // ===================================
    const token = await authFunc.getDataFromToken({ token: args.token }).catch(error => d.errorHandler(error, d.loggers))

    return {
      success: true,
      result: token?.data?.userId ? true : false
    }
  }
}