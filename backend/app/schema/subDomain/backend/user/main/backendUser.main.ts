import sequelizeErrorHandler from "../../../../utils/errorHandling/handers/sequelize.errorHandler";
import { d_allDomain } from "../../../../utils/types/dependencyInjection.types";
import addOne from "./scripts/main/addOne.script"
import deleteOne from "./scripts/main/deactivateOne.script"
import getManyWithPagination from "./scripts/main/getManyWithPagination.script"
import getOneById from "./scripts/main/getOneById.script"
import updateOne from "./scripts/main/updateOne.script";

export default function makeBackendUserMain(d: d_allDomain) {

  return {
    addOne: addOne(d),
    deleteOne: deleteOne(d),
    getManyWithPagination: getManyWithPagination(d),
    getOneById: getOneById(d),
    updateOne: updateOne(d),
  }
}