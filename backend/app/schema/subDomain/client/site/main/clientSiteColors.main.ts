import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types";
import getOne from "./scripts/colorsMain/getOne.script";
import upsertOne from "./scripts/colorsMain/upsertOne.script";

export default function makeClientSiteColorsMain(d: dependencies) {

  return {
    getOne: getOne(d),
    upsertOne: upsertOne(d),
  }
}