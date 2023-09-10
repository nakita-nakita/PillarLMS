import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types"
import { d_domain } from "../../../../../../utils/types/dependencyInjection.types"
import makeFoundationAuthFunc from "../../../preMain/foundationAuth.func"

type input = {
  token: string
}

export default function isTokenValid(d: d_domain) {
  return async (args: input): Promise<returningSuccessObj<null>> => {

    const authFunc = makeFoundationAuthFunc(d)

    //////////////////////////////////////
    // Validations
    // ===================================
    const token = await authFunc.getDataFromToken({ token: args.token })

    return {
      success: true,
      result: token?.data?.userId ? true : false

    }
  }
}