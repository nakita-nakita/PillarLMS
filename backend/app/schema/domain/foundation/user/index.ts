import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import makeFoundationUserMain from "./main/foundationUser.main";
import makeFoundationUserProfileMain from "./main/foundationUserProfile.main";
import makeFoundationUserValidation from "./preMain/foundationUser.validation";



export default function makeFoundationUserEntity(d: dependencies) {
  const userMain = makeFoundationUserMain(d)
  const userProfileMain = makeFoundationUserProfileMain(d)
  const userProfileValidation = makeFoundationUserValidation(d)

  return {
    userMain,
    userProfileMain,
    userProfileValidation,
  }
}
