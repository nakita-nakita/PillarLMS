import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import addOne from "./scripts/userSql/addOne.script";
import deleteOne from "./scripts/userSql/deleteOne.script";
import getManyWithPagination from "./scripts/userSql/getManyWithPagination.script";
import getOneById from "./scripts/userSql/getOneById.script";
import updateOne from "./scripts/userSql/updateOne.script";

export default function makeClientUserSql(d: dependencies) {

  return {
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getOneById: getOneById(d),
    updateOne: updateOne(d),
    getManyWithPagination: getManyWithPagination(d),
  }
}