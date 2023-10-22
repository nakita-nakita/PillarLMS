import { d_allDomain, d_sub } from "../../../../../utils/types/dependencyInjection.types";
import getOne from "./scripts/main/getOne.script"
import getOneRealTime from "./scripts/main/getOneRealTime.script";
import upsertOne from "./scripts/main/upsertOne.script";

export default function makeBackendSettingLinkMain(d: d_allDomain) {

  return {
    getOne: getOne(d),
    getOneRealTime: getOneRealTime(d),
    upsertOne: upsertOne(d),
  }
}
