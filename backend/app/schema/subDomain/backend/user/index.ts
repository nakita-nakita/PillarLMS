import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendUserMain from "./main/backendUser.main";
import makeBackendUserBasicViewMain from "./main/backendUserBasicView.main";
import makeBackendUserManyPermissionMain from "./main/backendUserManyPermission.main";
import makeBackendUserManyRoleMain from "./main/backendUserManyRole.main";
import makeBackendUserProfileMain from "./main/backendUserProfile.main";
import makeBackendUserValidation from "./preMain/backendUser.validation";



export default function makeBackendUserEntity(d: dependencies) {
  const userMain = makeBackendUserMain(d)
  const userBasicViewMain = makeBackendUserBasicViewMain(d)
  const userManyPermissionMain = makeBackendUserManyPermissionMain(d)
  const userManyRoleMain = makeBackendUserManyRoleMain(d)
  const userProfile = makeBackendUserProfileMain(d)

  const userValidation = makeBackendUserValidation(d)


  return {
    userMain,
    userBasicViewMain,
    userManyPermissionMain,
    userManyRoleMain,
    userProfile,


  }
}