import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import addOne from "./scripts/userMain/addOne.script";
import deleteOne from "./scripts/userMain/deleteOne.script";
import getManyWithPagination from "./scripts/userMain/getManyWithPagination.script";
import getOneById from "./scripts/userMain/getOneById.script";
import updateOne from "./scripts/userMain/updateOne.script";

export default function makeClientUserMain(d: dependencies) {

  return {
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getOneById: getOneById(d),
    getManyWithPagination: getManyWithPagination(d),
    updateOne: updateOne(d),
  }
}