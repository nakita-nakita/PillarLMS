import { Model } from "sequelize";
import { returningSuccessObj } from "../../../../../../utils/types/returningObjs.types";
import endMainFromError from "../../../../../../utils/graphql/endMainFromError.func";
import makeBackendPermissionSql from "../../../preMain/backendPermission.sql";
import makeBackendPermissionValidation from "../../../preMain/backendPermission.validation";
import backendPermission from "../../../../../../../models/subDomain/backend/permission/backendPermission.model";
import { dependencies } from "../../../../../../utils/dependencies/type/dependencyInjection.types";

type input = {
  name: string
}

export default function addOne(d: dependencies) {
  return async (args: input): Promise<returningSuccessObj<Model<backendPermission> | null>> => {

    const permissionSql = makeBackendPermissionSql(d);
    const permissionValidation = makeBackendPermissionValidation(d);

    //////////////////////////////////////
    // Validations
    // ===================================

    if (!args.name) {
      return endMainFromError({
        hint: "Datapoint 'name' is missing.",
        errorIdentifier: "backendPermission_addOne_error0001"
      })
    }
    if (args.name.length > 50) {
      return endMainFromError({
        hint: "Datapoint 'name' is too long. 50 character max.",
        errorIdentifier: "backendPermission_addOne_error0002"
      })
    }

    const isNameTaken = await permissionValidation.isNameTaken({
      name: args.name
    }).catch(error => d.errorHandler(error, d.loggers))

    if (isNameTaken.result) {
      return endMainFromError({
        hint: "Datapoint 'name' is already taken. Please select a new name.",
        errorIdentifier: "backendPermission_addOne_error0003"
      })
    }

    //////////////////////////////////////
    // Sql
    // ===================================    

    const response = await permissionSql.addOne({
      name: args.name,
    }).catch(error => d.errorHandler(error, d.loggers))

    return response
  }
}
