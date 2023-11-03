import { dependencies } from "../../../utils/dependencies/type/dependencyInjection.types";
import makeBackendPermissionMain from "./main/backendPermission.main";
import makeBackendPermissionValidation from "./preMain/backendPermission.validation";

export default function makeBackendPermissionEntity(d: dependencies) {
  const main = makeBackendPermissionMain(d)
  const validators = makeBackendPermissionValidation(d)

  return {
    permissionEntity: {
      ...main,
      ...validators,
    }
  }
}