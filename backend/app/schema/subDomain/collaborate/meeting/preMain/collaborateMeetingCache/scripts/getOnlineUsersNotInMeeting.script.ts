import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeMeeting from "../../../../_singleton/preMain/meetings.ram-cache";
import _ from "lodash"
import { socketLookUpType } from "../../../../_singleton/preMain/scripts/socketLookUp/socketRecord.types";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  id: string
}

export default function getOnlineUsersNotInMeeting(d: dependencies) {

  return async (args: input): Promise<returningSuccessObj<socketLookUpType[]>> => {

    const meeting = makeMeeting(d)

    // this function already filters for only one user.
    const result = await meeting.getOnlineUsersNotInMeeting({
      meetingId: args.id
    })

    //clean-up userId should be id in this context
    const data = [...result.data].map(l => {

      l.id = l.userId

      return l
    })

    return {
      success: true,
      data,
    }
  }
}


