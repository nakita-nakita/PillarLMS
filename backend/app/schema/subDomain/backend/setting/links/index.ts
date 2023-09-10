import { d_allDomain } from "../../../../utils/types/dependencyInjection.types"
import makeBackendSettingLinksMain from "./main/backendSetting_links.main"
// import makeBackendSettingLookUpMain from "./main/backendSetting_links.main"
// import makeBackendSettingLookUpAddressMain from "./main/backendSetting_lookUpAddress.main"
// import makeBackendSettingLookUpEmailMain from "./main/backendSetting_lookUpEmail.main"
// import makeBackendSettingLookUpFaceMain from "./main/backendSetting_lookUpFace.main"
// import makeBackendSettingLookUpFaceExperienceMain from "./main/backendSetting_lookUpFaceExperience.main"
// import makeBackendSettingLookUpPhoneMain from "./main/backendSetting_lookUpPhone.main"
// import makeBackendSettingLookUpSocialLinkMain from "./main/backendSetting_lookUpSocialLink.main"

export default function makeBackendSettingLinks(d: d_allDomain) {
  const backendSettingLinksMain = makeBackendSettingLinksMain(d)

  return {
    backendSettingLinksMain,
  }
}