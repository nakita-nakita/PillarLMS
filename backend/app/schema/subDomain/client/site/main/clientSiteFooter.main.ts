import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import getOne from "./scripts/footerMain/getOne.script";
import upsertOne from "./scripts/footerMain/upsertOne.script";

export default function makeClientSiteFooterMain(d: dependencies) {

  return {
    getOne: getOne(d),
    upsertOne: upsertOne(d),
  }
}
