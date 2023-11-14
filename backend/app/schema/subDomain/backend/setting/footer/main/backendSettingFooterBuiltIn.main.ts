import { dependencies } from "../../../../../utils/dependencies/type/dependencyInjection.types";
import getMany from "./scripts/footerBuiltIn/getMany.script";


export default function makeBackendSettingFooterBuiltInMain(d: dependencies) {

  return {
    getMany: getMany(d),
  }
}
