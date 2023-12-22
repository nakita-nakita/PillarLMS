import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import getOne from "./scripts/headerSql/getOne.script";
import upsertOne from "./scripts/headerSql/upsertOne.script";

export default function makeClientSiteHeaderSql(d: dependencies) {

  return {
    getOne: getOne(d),
    upsertOne: upsertOne(d),
  }
}