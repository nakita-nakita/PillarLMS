import { d_allDomain } from "../../../../utils/types/dependencyInjection.types"
import broadcastByMeetingId from "./scripts/broadcasters/broadcastByMeetingId.script"
import broadcastByUrl from "./scripts/broadcasters/broadcastByUrl.script"

export default function makeBoardcasters(d: d_allDomain) {
  return {
    broadcastByMeetingId: broadcastByMeetingId(d),
    broadcastByUrl: broadcastByUrl(d)
  }
}