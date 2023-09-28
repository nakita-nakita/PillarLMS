import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types"
import { d_domain } from "../../../../../../utils/types/dependencyInjection.types"
import makeFoundationAuthFunc from "../../../preMain/foundationAuth.func"

type input = {
  token: string
}

export default function isTokenValid(d: d_domain) {
  return async (args: input): Promise<returningSuccessObj<null>> => {

     console.log('checking token!!!!!!!!!!!!!!')
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