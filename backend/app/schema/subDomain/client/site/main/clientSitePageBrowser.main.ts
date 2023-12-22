import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import getOneByPageId from "./scripts/pageBrowserMain/getOneByPageId.script";
import upsertOne from "./scripts/pageBrowserMain/upsertOne.script";
import setList from "./scripts/pageBrowserMain/setList.script";

export default function makeClientSitePageBrowserMain(d: dependencies) {

  return {
    getOneByPageId: getOneByPageId(d),
    upsertOne: upsertOne(d),
    setList: setList(d),
  }
}