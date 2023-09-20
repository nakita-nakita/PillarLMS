import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { singleton } from "./_singleton.private";


export default function destroy(d: d_allDomain) {
  return async (): Promise<returningSuccessObj<any>> => {

    const data = singleton

    for (var prop in data) {
        delete data[prop]
    }

    return {
      success: true,
      data,
    }
  }
}


