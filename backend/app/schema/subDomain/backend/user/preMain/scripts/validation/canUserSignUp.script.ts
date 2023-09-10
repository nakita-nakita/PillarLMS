import { d_sub } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

export default function canUserSignUp({ subDomainDb, errorHandler, transaction, loggers, }: d_sub) {
  const db = subDomainDb.models;

  return async (): Promise<returningSuccessObj<null>> => {

    const settingRequest = await db.backendSetting_backendUserRequest.findOne({
      transaction
    }).catch(error => errorHandler(error, loggers))

    switch (settingRequest.type) {
      case "MANUAL":
        return {
          success: true,
          result: false,
          humanMessage: "User signup by invite only."
        }
      case "REQUEST_NO_PASSWORD":
        return {
          success: true,
          result: false,
          humanMessage: "Please use user request."
        }
      case "REQUEST":
        return {
          success: true,
          result: false,
          humanMessage: "Please use user request with password."
        }
    }

    return {
      success: true,
      result: true
    }
  }
}


