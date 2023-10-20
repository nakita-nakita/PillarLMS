import { d_allDomain } from "../../../../../../utils/types/dependencyInjection.types";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSingleton from "../../../../_singleton/preMain/_singleton.ram-cache";
import makeMeeting from "../../../../_singleton/preMain/meetings.ram-cache";
import { meetingType } from "../../../../_singleton/preMain/scripts/meetings/meeting.types";
import _ from "lodash"
import RealTimeYDocAdapter from "../../../forUsage/adapters/RealTimeYDocAdapter";
import RealTimeSwitchAdapter from "../../../forUsage/adapters/RealTimeSwitchAdapter";
import RealTimeColorAdapter from "../../../forUsage/adapters/RealTimeColorPickerAdapter";
import RealTimePictureSelectionAdapter from "../../../forUsage/adapters/RealTimePictureSelectionAdapter";

type input = {
  entity: string,
  name: string,
}

export default function getByPropertyName(d: d_allDomain) {

  return async (args: input): Promise<returningSuccessObj<RealTimeYDocAdapter | RealTimeSwitchAdapter | RealTimeColorAdapter | RealTimePictureSelectionAdapter>> => {

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


