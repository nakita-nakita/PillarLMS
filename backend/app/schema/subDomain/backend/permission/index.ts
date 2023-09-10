import { d_sub } from "../../../utils/types/dependencyInjection.types";
import makeBackendPermissionMain from "./main/backendPermission.main";
import makeBackendPermissionValidation from "./preMain/backendPermission.validation";

export default function makeBackendPermissionEntity(d: d_sub) {
  const main = makeBackendPermissionMain(d)
  const validators = makeBackendPermissionValidation(d)

  return {
    permissionEntity: {
      ...main,
      ...validators,
    }
  }
}