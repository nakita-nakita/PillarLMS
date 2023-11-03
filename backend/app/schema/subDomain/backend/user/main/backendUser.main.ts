import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import addOne from "./scripts/main/addOne.script"
import addOneById from "./scripts/main/addOneById.script";
import deleteOne from "./scripts/main/deactivateOne.script"
import getManyWithPagination from "./scripts/main/getManyWithPagination.script"
import getOneById from "./scripts/main/getOneById.script"
import updateOne from "./scripts/main/updateOne.script";

export default function makeBackendUserMain(d: dependencies) {

  return {
    addOne: addOne(d),
    addOneById: addOneById(d),
    deleteOne: deleteOne(d),
    getManyWithPagination: getManyWithPagination(d),
    getOneById: getOneById(d),
    updateOne: updateOne(d),
  }
}