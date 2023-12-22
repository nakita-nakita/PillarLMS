import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import getOne from "./scripts/footerSql/getOne.script";
import upsertOne from "./scripts/footerSql/upsertOne.script";

export default function makeClientSiteFooterSql(d: dependencies) {

  return {
    getOne: getOne(d),
    upsertOne: upsertOne(d),
  }
}