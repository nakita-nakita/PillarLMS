import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import destroy from "./scripts/_singleton/destroy.script"
import get from "./scripts/_singleton/get.script"
import remove from "./scripts/_singleton/remove.script"
import set from "./scripts/_singleton/set.script"

export default function makeSingleton(d: dependencies) {
  return {
    destory: destroy(d),
    remove: remove(d),
    get: get(d),
    set: set(d),
  }
}