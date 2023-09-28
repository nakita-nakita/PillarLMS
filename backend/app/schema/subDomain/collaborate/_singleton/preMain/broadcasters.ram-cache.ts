import { d_allDomain } from "../../../../utils/types/dependencyInjection.types"
import broadcastByUrl from "./scripts/broadcasters/broadcastByUrl.script"
import broadcastForNotification from "./scripts/broadcasters/broadcastForNotification.script"

export default function makeBoardcasters(d: d_allDomain) {
  return {
    broadcastByUrl: broadcastByUrl(d),
    broadcastForNotification: broadcastForNotification(d), 
  }
}