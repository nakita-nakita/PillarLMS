import { d_sub } from "../../../../utils/types/dependencyInjection.types"
import addOne from "./scripts/sql/addOne.script"
import deleteOne from "./scripts/sql/deleteOne.script"
import getFirstByCount from "./scripts/sql/getFirstByCount.script"
import getManyWithPagination from "./scripts/sql/getManyWithPagination.script"
import getOneById from "./scripts/sql/getOneById.script"
import getUnseenNotificationCount from "./scripts/sql/getUnseenNotificationCount.script"
import hasBeenClick from "./scripts/sql/hasBeenClick.script"
import hasBeenSeen from "./scripts/sql/hasBeenSeen.script"
import hasBeenSeenById from "./scripts/sql/hasBeenSeenById.script"
import updateOne from "./scripts/sql/updateOne.script"

export default function makeBackendNotificationSql(d: d_sub) {

  return {
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getUnseenNotificationCount: getUnseenNotificationCount(d),
    getManyWithPagination: getManyWithPagination(d),
    getOneById: getOneById(d),
    getFirstByCount: getFirstByCount(d),
    hasBeenClick: hasBeenClick(d),
    hasBeenSeen: hasBeenSeen(d),
    hasBeenSeenById: hasBeenSeenById(d),
    updateOne: updateOne(d),
  }
}

