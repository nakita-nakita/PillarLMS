import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import { singleton } from "./_singleton.private";


export default function destroy(d: dependencies) {
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


