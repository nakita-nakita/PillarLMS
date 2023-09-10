import { d_allDomain } from "../../../../utils/types/dependencyInjection.types"
import addMany from "./scripts/sql/addMany.script"
import addOne from "./scripts/sql/addOne.script"
import deleteOne from "./scripts/sql/deleteOne.script"
import getOneById from "./scripts/sql/getOneById.script"
import updateOne from "./scripts/sql/updateOne.script"
import getManyWithPagination from "./scripts/sql/getManyWithPagination.script"

export default function makeBackendUserSql(d: d_allDomain) {
  let d_subDomain =  {
    ...d,
    transaction: d.subDomaintransaction,
  };

  // let d_domain =  {
  //   ...d,
  //   transaction: d.domainTransaction,
  // };
  return {
    addMany: addMany(d_subDomain),
    addOne: addOne(d_subDomain),
    getManyWithPagination: getManyWithPagination(d),
    deleteOne: deleteOne(d_subDomain),
    getOneById: getOneById(d_subDomain),
    updateOne: updateOne(d_subDomain),
  }
}
