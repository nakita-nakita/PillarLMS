import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import addOne from "./scripts/pageSectionNormalSql/addOne.script";
import deleteOne from "./scripts/pageSectionNormalSql/deleteOne.script";
import getManyByPageId from "./scripts/pageSectionNormalSql/getManyByPageId.script";
import getOneById from "./scripts/pageSectionNormalSql/getOneById.script";
import updateOne from "./scripts/pageSectionNormalSql/updateOne.script";
import setList from "./scripts/pageSectionNormalSql/setList.script";

export default function makeClientSitePageSectionNormalSql(d: dependencies) {

  return {
    addOne: addOne(d),
    getManyByPageId: getManyByPageId(d),
    getOneById: getOneById(d),
    updateOne: updateOne(d),
    deleteOne: deleteOne(d),
    setList: setList(d),
  }
}
