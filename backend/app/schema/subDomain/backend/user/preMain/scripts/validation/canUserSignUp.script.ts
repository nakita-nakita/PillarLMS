import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";

export default function canUserSignUp(d: dependencies) {
  const db = d.subDomainDb.models;

  return async (): Promise<returningSuccessObj<null>> => {

    const settingRequest = await db.backendSetting_backendUserRequest.findOne({
      transaction: d.subDomainTransaction
    }).catch(error => d.errorHandler(error, d.loggers))

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


