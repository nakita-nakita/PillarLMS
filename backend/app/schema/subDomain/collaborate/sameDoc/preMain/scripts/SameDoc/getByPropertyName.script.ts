import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSingleton from "../../../../_singleton/preMain/_singleton.ram-cache";
import _ from "lodash"
import RealTimeYDocAdapter from "../../../forUsage/adapters/RealTimeYDocAdapter";
import RealTimeSwitchAdapter from "../../../forUsage/adapters/RealTimeSwitchAdapter";
import RealTimeColorAdapter from "../../../forUsage/adapters/RealTimeColorPickerAdapter";
import RealTimePictureSelectionAdapter from "../../../forUsage/adapters/RealTimePictureSelectionAdapter";
import RealTimeFaviconSelectionAdapter from "../../../forUsage/adapters/RealTimeFaviconSelectionAdapter";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  entity: string,
  name: string,
}

export default function getByPropertyName(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<RealTimeYDocAdapter | RealTimeSwitchAdapter | RealTimeColorAdapter | RealTimePictureSelectionAdapter | RealTimeFaviconSelectionAdapter>> => {

    const singletonFunc = makeSingleton(d)

    const singleton = await singletonFunc.get()

    if (!singleton.data?.sameDoc) {
      // init if doesn't exist.
      singleton.data.sameDoc = {}
    }

    if (!singleton.data.sameDoc[args.entity]) {
      return {
        success: true,
        data: undefined
      }
    }

    if (!singleton.data.sameDoc[args.entity][args.name]) {
      return {
        success: true,
        data: undefined
      }
    }

    return {
      success: true,
      data: singleton.data.sameDoc[args.entity][args.name],
    }
  }
}


