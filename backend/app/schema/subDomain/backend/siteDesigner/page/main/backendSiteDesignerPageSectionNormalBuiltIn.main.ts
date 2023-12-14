import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import getMany from "./scripts/sectionNormalBuiltIn/getMany.script";
import getOneById from "./scripts/sectionNormalBuiltIn/getOneById.script";

export default function makeBackendSiteDesignerPageSectionNormalBuiltInMain(d: dependencies) {

  return {
    getMany: getMany(d),
    getOneById: getOneById(d),
  }
}
