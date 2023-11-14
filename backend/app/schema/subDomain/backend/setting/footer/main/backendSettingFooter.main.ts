import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import getOne from "./scripts/footer/getOne.script"
// import getOneRealTime from "./scripts/footer/getOneRealTime.script";
import upsertOne from "./scripts/footer/upsertOne.script";

export default function makeBackendSettingFooterMain(d: dependencies) {

  return {
    getOne: getOne(d),
    // getOneRealTime: getOneRealTime(d),
    upsertOne: upsertOne(d),
  }
}
