import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import getOne from "./scripts/header/getOne.script"
import getOneRealTime from "./scripts/header/getOneRealTime.script";
import upsertOne from "./scripts/header/upsertOne.script";

export default function makeBackendSettingHeaderMain(d: dependencies) {

  return {
    getOne: getOne(d),
    getOneRealTime: getOneRealTime(d),
    upsertOne: upsertOne(d),
  }
}
