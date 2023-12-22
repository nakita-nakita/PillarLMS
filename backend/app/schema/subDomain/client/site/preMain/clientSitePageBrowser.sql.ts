import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import deleteOne from "./scripts/pageBrowserSql/deleteOne.script";
import getOneByPageId from "./scripts/pageBrowserSql/getOneByPageId.script";
import upsertOne from "./scripts/pageBrowserSql/upsertOne.script";
import setList from "./scripts/pageBrowserSql/setList.script";

export default function makeClientSitePageBrowserSql(d: dependencies) {

  return {
    deleteOne: deleteOne(d),
    getOneByPageId: getOneByPageId(d),
    upsertOne: upsertOne(d),
    setList: setList(d),
  }
}