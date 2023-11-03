import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import getAllMeetings from "./scripts/collaborateMeetingMain/getAllMeetings.script"
import getMeetingById from "./scripts/collaborateMeetingMain/getMeetingById.script"
import getMeetingsForUrl from "./scripts/collaborateMeetingMain/getMeetingsForUrl.script"
import getOnlineUsersNotInMeeting from "./scripts/collaborateMeetingMain/getOnlineUsersNotInMeeting.script"
import getUsersForMeeting from "./scripts/collaborateMeetingMain/getUsersForMeeting.script"


export default function makeCollaborateMeetingMain(d: dependencies) {
  return {
    getAllMeetings: getAllMeetings(d),
    getMeetingById: getMeetingById(d),
    getMeetingsForUrl: getMeetingsForUrl(d),
    getOnlineUsersNotInMeeting: getOnlineUsersNotInMeeting(d),
    getUsersForMeeting: getUsersForMeeting(d),
  }
}