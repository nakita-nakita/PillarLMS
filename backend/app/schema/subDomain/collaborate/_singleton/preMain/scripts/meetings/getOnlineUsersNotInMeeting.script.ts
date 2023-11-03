import _ from "lodash";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import makeSingleton from "../../_singleton.ram-cache";
import makeSocketLookUp from "../../socketLookUp.ram-cache";
import { socketLookUpType } from "../socketLookUp/socketRecord.types";
import makeGetMeetingById from "./getMeetingById.script";
import makeGetUsersForMeeting from "./getUsersForMeeting.script";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  meetingId: string,
}

export default function getOnlineUsersNotInMeeting(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<socketLookUpType[]>> => {

    const singletonFunc = makeSingleton(d)
    const getUsersForMeeting = makeGetUsersForMeeting(d)

    const singleton = await singletonFunc.get()

    if (!singleton.data?.socketLookUp) {
      // init if doesn't exist.
      singleton.data.socketLookUp = []
    }

    const meetingUsers = await getUsersForMeeting({
      meetingId: args.meetingId
    })

    // user can have multiple sockets so this removes duplicate for user display.
    const currentUserIds = []
    const onlineUsers = singleton.data?.socketLookUp.filter(s => {
      if (!_.includes(currentUserIds, s.userId)) {
        currentUserIds.push(s.userId)
        return true
      }

      return false
    })

    //make list of online users not in meeting
    const data = onlineUsers.filter(function (objFromA) {
      return !meetingUsers.data.find(function (objFromB) {
        return objFromA.userId === objFromB.userId
      })
    })

    return {
      success: true,
      data,
    }

  }
}


