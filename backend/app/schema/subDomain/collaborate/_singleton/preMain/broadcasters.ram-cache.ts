import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import broadcastByUrl from "./scripts/broadcasters/broadcastByUrl.script"
import broadcastForNotification from "./scripts/broadcasters/broadcastForNotification.script"

export default function makeBoardcasters(d: dependencies) {
  return {
    broadcastByUrl: broadcastByUrl(d),
    broadcastForNotification: broadcastForNotification(d), 
  }
}