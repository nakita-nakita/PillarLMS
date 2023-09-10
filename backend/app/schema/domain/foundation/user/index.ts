import { d_domain } from "../../../utils/types/dependencyInjection.types";
import makeFoundationUserMain from "./main/foundationUser.main";
import makeFoundationUserProfileMain from "./main/foundationUserProfile.main";
import makeFoundationUserValidation from "./preMain/foundationUser.validation";



export default function makeFoundationUserEntity(d: d_domain) {
  const userMain = makeFoundationUserMain(d)
  const userProfileMain = makeFoundationUserProfileMain(d)
  const userProfileValidation = makeFoundationUserValidation(d)

  return {
    userMain,
    userProfileMain,
    userProfileValidation,
  }
}
