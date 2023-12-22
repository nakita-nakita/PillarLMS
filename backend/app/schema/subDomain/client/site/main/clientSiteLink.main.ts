import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import getOne from "./scripts/linkMain/getOne.script";
import upsertOne from "./scripts/linkMain/upsertOne.script";

export default function makeClientSiteLinkMain(d: dependencies) {

  return {
    getOne: getOne(d),
    upsertOne: upsertOne(d),
  }
}
