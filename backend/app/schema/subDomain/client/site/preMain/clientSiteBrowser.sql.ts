import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import getOne from "./scripts/browserSql/getOne.script";
import upsertOne from "./scripts/browserSql/upsertOne.script";

export default function makeClientSiteBrowserSql(d: dependencies) {

  return {
    getOne: getOne(d),
    upsertOne: upsertOne(d),
  }
}