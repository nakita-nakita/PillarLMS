import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import deleteOne from "./scripts/pageSectionLoudMain/deleteOne.script";
import getOneByPageId from "./scripts/pageSectionLoudMain/getOneByPageId.script";
import getOneById from "./scripts/pageSectionLoudMain/getOneById.script";
import upsertOne from "./scripts/pageSectionLoudMain/upsertOne.script";
import setList from "./scripts/pageSectionLoudMain/setList.script";

export default function makeClientSitePageSectionLoudMain(d: dependencies) {

  return {
    deleteOne: deleteOne(d),
    getOneById: getOneById(d),
    getOneByPageId: getOneByPageId(d),
    upsertOne: upsertOne(d),
    setList: setList(d),
  }
}
