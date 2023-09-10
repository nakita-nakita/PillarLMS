import { d_allDomain } from "../../../../utils/types/dependencyInjection.types"
import makeBackendSettingPasswordMain from "./main/backendSetting_site.main"

export default function makeBackendSettingPasswordEntity(d: d_allDomain) {
  const passwordMain = makeBackendSettingPasswordMain(d)

  return {
    passwordMain,
  }
}