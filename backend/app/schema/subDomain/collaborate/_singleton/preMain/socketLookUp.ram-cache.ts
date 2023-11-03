import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import get from "./scripts/socketLookUp/get.script"
import getLookUpBySocketId from "./scripts/socketLookUp/getLookUpBySocketId.script"
import getSocketsByUserId from "./scripts/socketLookUp/getSocketsByUserId.script"
import getUsernameForSocket from "./scripts/socketLookUp/getUsernameForSocket"
import removeBySocketId from "./scripts/socketLookUp/removeBySocketId.script"
import set from "./scripts/socketLookUp/set.script"
import updateBySocketId from "./scripts/socketLookUp/updateBySocketId.script"

export default function makeSocketLookUp(d: dependencies) {
  return {
    get: get(d),
    set: set(d),
    removeBySocketId: removeBySocketId(d),
    updateBySocketId: updateBySocketId(d),
    getUsernameForSocket: getUsernameForSocket(d),
    getSocketsByUserId: getSocketsByUserId(d),
    getLookUpBySocketId: getLookUpBySocketId(d),
  }
}