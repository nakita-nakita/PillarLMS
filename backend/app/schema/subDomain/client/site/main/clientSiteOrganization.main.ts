import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import getOne from "./scripts/organizationMain/getOne.script";
import upsertOne from "./scripts/organizationMain/upsertOne.script";

export default function makeClientSiteOrganizationMain(d: dependencies) {

  return {
    getOne: getOne(d),
    upsertOne: upsertOne(d),
  }
}