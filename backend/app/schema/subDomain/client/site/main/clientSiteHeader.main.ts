import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import getOne from "./scripts/headerMain/getOne.script";
import upsertOne from "./scripts/headerMain/upsertOne.script";

export default function makeClientSiteHeaderMain(d: dependencies) {

  return {
    getOne: getOne(d),
    upsertOne: upsertOne(d),
  }
}
