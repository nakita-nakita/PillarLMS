import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { singleton } from "./_singleton.private";

export default function get(d: dependencies) {
  return async (): Promise<returningSuccessObj<any>> => {

    const data = singleton

    return {
      success: true,
      data,
    }
  }
}


