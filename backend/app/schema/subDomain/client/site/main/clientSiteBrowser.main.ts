import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import getOne from "./scripts/browserMain/getOne.script";
import upsertOne from "./scripts/browserMain/upsertOne.script";

export default function makeClientSiteBrowserMain(d: dependencies) {

  return {
    getOne: getOne(d),
    upsertOne: upsertOne(d),
  }
}