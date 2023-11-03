import { dependencies } from "../../../../utils/dependencies/type/dependencyInjection.types"
import makeBackendSettingBackendUserRequestMain from "./main/backendSettingOrganization.main"

export default function makeBackendSettingBackendUserRequestEntity(d: dependencies) {
  const settingBackendUserRequestMain = makeBackendSettingBackendUserRequestMain(d)

  return {
    settingBackendUserRequestMain,
  }
}