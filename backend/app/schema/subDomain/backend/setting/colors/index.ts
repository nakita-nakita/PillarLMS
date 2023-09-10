import { d_allDomain } from "../../../../utils/types/dependencyInjection.types"
import makeBackendSettingEmailMain from "./main/backendSetting_colors.main"

export default function makeBackendSettingEmailEntity(d: d_allDomain) {
  const settingEmailMain = makeBackendSettingEmailMain(d)

  return {
    settingEmailMain,
  }
}