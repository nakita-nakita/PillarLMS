import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import getMany from "./scripts/headerBuiltIn/getMany.script";

export default function makeBackendSettingHeaderBuiltInMain(d: dependencies) {

  return {
    getMany: getMany(d),
  }
}
