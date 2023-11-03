import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import changeLeader from "./scripts/meetings/changeLeader.script"
import changeName from "./scripts/meetings/changeName.script"
import end from "./scripts/meetings/end.script"
import getAllMeetings from "./scripts/meetings/getAllMeetings.script"
import getMeetingById from "./scripts/meetings/getMeetingById.script"
import getMeetingsForUrl from "./scripts/meetings/getMeetingsForUrl.script"
import getOnlineUsersNotInMeeting from "./scripts/meetings/getOnlineUsersNotInMeeting.script"
import getUsersForMeeting from "./scripts/meetings/getUsersForMeeting.script"
import hangUp from "./scripts/meetings/hangUp.script"
import join from "./scripts/meetings/join.script"
import kickUserFromMeeting from "./scripts/meetings/kickUserFromMeeting.script"
import requestUrlChange from "./scripts/meetings/requestUrlChange.script"
import start from "./scripts/meetings/start.script"
import urlChange from "./scripts/meetings/urlChange.script"

export default function makeMeeting(d: dependencies) {
  return {
    changeLeader: changeLeader(d),
    changeName: changeName(d),
    end: end(d),
    getAllMeetings: getAllMeetings(d),
    getMeetingById: getMeetingById(d),
    getMeetingsForUrl: getMeetingsForUrl(d),
    getOnlineUsersNotInMeeting: getOnlineUsersNotInMeeting(d),
    getUsersForMeeting: getUsersForMeeting(d),
    hangUp: hangUp(d),
    join: join(d),
    kickUserFromMeeting: kickUserFromMeeting(d),
    requestUrlChange: requestUrlChange(d),
    start: start(d),
    urlChange: urlChange(d),
  }
}