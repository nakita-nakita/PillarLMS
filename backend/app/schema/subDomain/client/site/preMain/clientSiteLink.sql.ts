import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import getOne from "./scripts/linkSql/getOne.script";
import upsertOne from "./scripts/linkSql/upsertOne.script";

export default function makeClientSiteLinkSql(d: dependencies) {

  return {
    getOne: getOne(d),
    upsertOne: upsertOne(d),
  }
}