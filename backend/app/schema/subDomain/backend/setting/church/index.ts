import { d_allDomain } from "../../../../utils/types/dependencyInjection.types"
import makeBackendSettingBackendUserRequestMain from "./main/backendSetting_church.main"

export default function makeBackendSettingBackendUserRequestEntity(d: d_allDomain) {
  const settingBackendUserRequestMain = makeBackendSettingBackendUserRequestMain(d)

  return {
    settingBackendUserRequestMain,
  }
}