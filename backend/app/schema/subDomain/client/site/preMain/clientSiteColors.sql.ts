import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import getOne from "./scripts/colorsSql/getOne.script";
import upsertOne from "./scripts/colorsSql/upsertOne.script";

export default function makeClientSiteColorsSql(d: dependencies) {

  return {
    getOne: getOne(d),
    upsertOne: upsertOne(d),
  }
}