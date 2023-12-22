import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import deleteOne from "./scripts/pageLinkSql/deleteOne.script";
import getOneByPageId from "./scripts/pageLinkSql/getOneByPageId.script";
import upsertOne from "./scripts/pageLinkSql/upsertOne.script";
import setList from "./scripts/pageLinkSql/setList.script";

export default function makeClientSitePageLinkSql(d: dependencies) {

  return {
    deleteOne: deleteOne(d),
    getOneByPageId: getOneByPageId(d),
    upsertOne: upsertOne(d),
    setList: setList(d),
  }
}
