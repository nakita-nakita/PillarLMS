import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import getOneByPageId from "./scripts/pageLinkMain/getOneByPageId.script";
import upsertOne from "./scripts/pageLinkMain/upsertOne.script";
import setList from "./scripts/pageLinkMain/setList.script";

export default function makeClientSitePageLinkMain(d: dependencies) {

  return {
    getOneByPageId: getOneByPageId(d),
    upsertOne: upsertOne(d),
    setList: setList(d),
  }
}