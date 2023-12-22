import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import deleteOne from "./scripts/sectionLoud/deleteOne.script";
import getOneByPageId from "./scripts/sectionLoud/getOneByPageId.script";
import getMany from "./scripts/sectionLoud/getMany.script";
import getOneRealTimeByPageId from "./scripts/sectionLoud/getOneRealTimeByPageId.script";
import upsertOne from "./scripts/sectionLoud/upsertOne.script";

export default function makeBackendSiteDesignerPageSectionLoudMain(d: dependencies) {

  return {
    deleteOne: deleteOne(d),
    getOneByPageId: getOneByPageId(d),
    getMany: getMany(d),
    getOneRealTimeByPageId: getOneRealTimeByPageId(d),
    upsertOne: upsertOne(d),
  }
}
