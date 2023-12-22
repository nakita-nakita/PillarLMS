import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import getOne from "./scripts/organizationSql/getOne.script";
import upsertOne from "./scripts/organizationSql/upsertOne.script";

export default function makeClientSiteOrganizationSql(d: dependencies) {

  return {
    getOne: getOne(d),
    upsertOne: upsertOne(d),
  }
}
