import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import deleteOne from "./scripts/pageSectionLoudSql/deleteOne.script";
import getOneById from "./scripts/pageSectionLoudSql/getOneById.script";
import getOneByPageId from "./scripts/pageSectionLoudSql/getOneByPageId.script";
import upsertOne from "./scripts/pageSectionLoudSql/upsertOne.script";
import setList from "./scripts/pageSectionLoudSql/setList.script";

export default function makeClientSitePageSectionLoudSql(d: dependencies) {

  return {
    getOneByPageId: getOneByPageId(d),
    getOneById: getOneById(d),
    upsertOne: upsertOne(d),
    deleteOne: deleteOne(d),
    setList: setList(d),
  }
}